import {
  AuthUser,
  CompanyRole,
  configureServices,
  extractToken,
  fetchSession,
  HikeConfig,
  HikeError,
  verifyToken
} from '@hike/sdk';
import { NextRequest, NextResponse } from 'next/server';

interface HikeMiddlewareOptions {
  keyOrSecret: string;
  config: (request: NextRequest) => Pick<HikeConfig, 'apiHosts' | 'appHost' | 'appEnv'>;
  callback?: {
    beforeAuth?: (request: NextRequest) => Promise<void> | void;
    afterAuth?: (
      session: AuthUser,
      companyId: string | undefined,
      isAdmin: boolean,
      request: NextRequest
    ) => Promise<void> | void;
    onResponse?: (request: NextRequest, session: AuthUser | null) => NextResponse<unknown>;
  };
  restrictedRoles?: CompanyRole[];
}

export const withHikeMiddleware = ({ keyOrSecret, config, callback, restrictedRoles }: HikeMiddlewareOptions) =>
  async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const pathParts = pathname.split('/');
    const slug = pathParts[1] !== 'login' ? pathParts[1] || null : null;
    const loginPath = slug ? `/${slug}/login` : '/login';

    try {
      // Set up services such as backend API
      configureServices(config(request));

      // Execute pre-authentication hook; may throw error to prevent access
      await callback?.beforeAuth?.(request);

      // Extract token from header or cookie
      const token = extractToken(request);

      if (!token) {
        throw new HikeError({
          message: 'Token not found',
          statusCode: 401
        });
      }

      // Validate token has been signed by the server
      await verifyToken(token, keyOrSecret);

      // Retrieve additional session details from the backend
      // TODO: Optimize latency; caching or client optionally provides
      const session = await fetchSession(token);

      // Ensure user has minimum role access
      const hasAccess =
        !restrictedRoles || Object.values(session.companies).some((role) => !restrictedRoles.includes(role));

      if (hasAccess) {
        const companyId = Object.entries(session.slugs).find(([key]) => session.slugs[key] === slug)?.[0];
        const isAdmin = !!companyId && session.companies[companyId] === 'ADMIN';

        // Execute post-authentication hook; may throw error to prevent access
        await callback?.afterAuth?.(session, companyId, isAdmin, request);

        return callback?.onResponse?.(request, session) ?? NextResponse.next();
      }
    } catch (error) {
      console.error(error);
    }

    // Default redirection to login
    if (!pathname.startsWith(loginPath) && pathname !== '/') {
      const loginUrl = new URL(loginPath, request.url);
      loginUrl.searchParams.set('redirect', request.url);
      return NextResponse.redirect(loginUrl);
    }

    return callback?.onResponse?.(request, null) ?? NextResponse.next();
  };

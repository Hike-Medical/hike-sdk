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
  config: (request: NextRequest) => Pick<HikeConfig, 'appEnv' | 'appId'>;
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
  loginPath?: (session: AuthUser | null) => string | null;
  allowedPaths?: string[];
  restrictedRoles?: CompanyRole[];
}

export const withHikeMiddleware = ({
  keyOrSecret,
  config,
  callback,
  restrictedRoles,
  allowedPaths,
  loginPath
}: HikeMiddlewareOptions) =>
  async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const pathParts = pathname.split('/');
    const slug = pathParts[1] !== 'login' ? pathParts[1] || null : null;

    // Set up services such as backend API
    configureServices(config(request));

    const onNextResponse = (session: AuthUser | null = null) =>
      callback?.onResponse?.(request, session) ?? NextResponse.next();

    // Allow requests to paths that are not protected
    if (allowedPaths?.map((path) => path.replace(/\/$/, '')).includes(pathname.replace(/\/$/, ''))) {
      try {
        const token = extractToken(request);
        const session = await fetchSession(token);
        return onNextResponse(session);
      } catch {
        return onNextResponse();
      }
    }

    try {
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

        return onNextResponse(session);
      }
    } catch (error) {
      console.error(error);
    }

    // Determine login path
    const login = await (async () => {
      const path =
        loginPath?.(
          await (async () => {
            try {
              const token = extractToken(request);
              return await fetchSession(token);
            } catch {
              return null;
            }
          })()
        ) || '/login';

      return slug ? `/${slug}${path}` : path;
    })();

    // Default redirection to login
    if (!pathname.startsWith(login) && pathname !== '/') {
      const loginUrl = new URL(login, request.url);
      loginUrl.searchParams.set('redirect', request.url);
      return NextResponse.redirect(loginUrl);
    }

    return onNextResponse();
  };

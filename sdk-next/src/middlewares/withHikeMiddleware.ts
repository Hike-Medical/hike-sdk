import {
  AuthUser,
  CompanyRole,
  configureServices,
  extractToken,
  fetchSession,
  HikeConfig,
  HikeError,
  isDefined,
  verifyToken
} from '@hike/sdk';
import { NextRequest, NextResponse } from 'next/server';

interface HikeMiddlewareOptions {
  keyOrSecret: string;
  config: (request: NextRequest) => Pick<HikeConfig, 'appEnv' | 'appId'>;
  callback?: {
    beforeAuth?: ({ request, slug }: { request: NextRequest; slug: string | null }) => Promise<void> | void;
    afterAuth?: ({
      request,
      session,
      companyId,
      isAdmin,
      slug
    }: {
      request: NextRequest;
      session: AuthUser;
      companyId: string | undefined;
      isAdmin: boolean;
      slug: string | null;
    }) => Promise<void> | void;
    onResponse?: ({
      request,
      session,
      slug
    }: {
      request: NextRequest;
      session: AuthUser | null;
      slug: string | null;
    }) => NextResponse<unknown>;
  };
  loginPath?: ({ session, slug }: { session: AuthUser | null; slug: string | null }) => string | null;
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
    const slug = pathParts[1] && !['login', 'enroll'].includes(pathParts[1]) ? pathParts[1] : null;
    const slugPath = slug ? `/${slug}` : '';

    // Set up services such as backend API
    configureServices(config(request));

    const onNextResponse = (session: AuthUser | null = null) =>
      callback?.onResponse?.({ request, session, slug }) ?? NextResponse.next();

    // Adjust allowed paths
    const allowedPathGroups = allowedPaths
      // Ignore trailing slashes
      ?.map((path) => path.replace(/\/$/, ''))
      // Handle slug based paths
      .map((path) => (slug ? path.replace('{slug}', slug) : path.includes('{slug}') ? null : path))
      .filter(isDefined)
      // Handle wildcard paths
      .reduce<{ static: string[]; wildcards: string[] }>(
        (acc, path) => {
          const isWildcard = path.endsWith('/*');
          const allowPath = isWildcard ? path.slice(0, -2) : path;
          acc[isWildcard ? 'wildcards' : 'static'].push(allowPath);
          return acc;
        },
        { static: [], wildcards: [] }
      );

    // Allow requests to paths that are not protected
    if (
      pathname.startsWith(`${slugPath}/login`) ||
      allowedPathGroups?.static.includes(pathname.replace(/\/$/, '')) ||
      allowedPathGroups?.wildcards.some((path) => pathname.startsWith(path))
    ) {
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
      await callback?.beforeAuth?.({ request, slug });

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
        !restrictedRoles || Object.values(session.companies).some((role) => role && !restrictedRoles.includes(role));

      if (hasAccess) {
        const companyId = Object.entries(session.slugs).find(([key]) => session.slugs[key] === slug)?.[0];
        const isAdmin = !!companyId && session.companies[companyId] === 'ADMIN';

        // Execute post-authentication hook; may throw error to prevent access
        await callback?.afterAuth?.({ request, session, companyId, isAdmin, slug });

        return onNextResponse(session);
      }
    } catch (error) {
      console.error(error);
    }

    // Determine login path
    const login = await (async () => {
      const path =
        loginPath?.({
          session: await (async () => {
            try {
              const token = extractToken(request);
              return await fetchSession(token);
            } catch {
              return null;
            }
          })(),
          slug
        }) || '/login';

      return `${slugPath}${path}`;
    })();

    // Default redirection to login
    if (!pathname.startsWith(login) && pathname !== '/') {
      const loginUrl = new URL(login, request.url);
      loginUrl.searchParams.set('redirect', request.url);
      return NextResponse.redirect(loginUrl);
    }

    return onNextResponse();
  };

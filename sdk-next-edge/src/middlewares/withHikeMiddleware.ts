import { AuthError, extractToken, fetchSessionUser, verifyToken } from '@hike/auth';
import type { AuthUser, CompanyRole, HikeConfig } from '@hike/types';
import { isDefined } from '@hike/types';
import { Constants, selectPreferredLocale } from '@hike/utils';
import { NextRequest, NextResponse } from 'next/server';

type HikeMiddlewareConfig = Pick<HikeConfig, 'appEnv' | 'appId'>;

interface HikeMiddlewareOptions {
  keyOrSecret: string;
  config: HikeMiddlewareConfig;
  locales?: string[];
  callback?: {
    beforeAuth?: ({
      request,
      config,
      slug
    }: {
      request: NextRequest;
      config: HikeMiddlewareConfig;
      slug: string | null;
    }) => Promise<void> | void;
    afterAuth?: ({
      request,
      config,
      user,
      companyId,
      isAdmin,
      slug
    }: {
      request: NextRequest;
      config: HikeMiddlewareConfig;
      user: AuthUser;
      companyId: string | undefined;
      isAdmin: boolean;
      slug: string | null;
    }) => Promise<void> | void;
    onResponse?: ({
      request,
      config,
      user,
      slug
    }: {
      request: NextRequest;
      config: HikeMiddlewareConfig;
      user: AuthUser | null;
      slug: string | null;
    }) => NextResponse;
  };
  loginPath?: ({
    config,
    user,
    slug,
    companyId
  }: {
    config: HikeMiddlewareConfig;
    user: AuthUser | null;
    slug: string | null;
    companyId: string | undefined;
  }) => string | null;
  allowedPaths?: string[];
  restrictedRoles?: CompanyRole[];
  isMaintenanceMode?: boolean;
  maintenancePath?: string;
  nonSlugs?: string[];
}

/**
 * Middleware to authenticate requests for Next.js applications.
 *
 * @param options - The options for the middleware.
 * @returns The middleware function.
 */
export const withHikeMiddleware = ({
  keyOrSecret,
  config,
  locales,
  callback,
  restrictedRoles,
  allowedPaths,
  loginPath,
  isMaintenanceMode,
  maintenancePath = '/maintenance.html',
  nonSlugs = []
}: HikeMiddlewareOptions) =>
  async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const pathParts = pathname.split('/');

    // Determine slug from path
    nonSlugs.push('login');
    const slug = pathParts[1] && !nonSlugs.includes(pathParts[1]) ? pathParts[1] : null;
    const slugPath = slug ? `/${slug}` : '';

    // Exit to maintenance page if applicable
    if (isMaintenanceMode) {
      request.nextUrl.pathname = maintenancePath;
      return NextResponse.rewrite(request.nextUrl);
    }

    // Build response to return
    const onNextResponse = (user: AuthUser | null): NextResponse => {
      const response = callback?.onResponse?.({ request, config, user, slug }) ?? NextResponse.next();

      // Handle internationalization if applicable
      if (locales) {
        const localeCookie = request.cookies.get('locale')?.value;
        const acceptLanguage = request.headers.get('accept-language');
        const slugSuffix = slug ? `.${slug}` : '';

        const locale =
          localeCookie && locales.includes(localeCookie)
            ? localeCookie
            : selectPreferredLocale({
                acceptLanguage,
                supportedLocales: locales,
                defaultLocale: Constants.i18n.DEFAULT_LOCALE
              });

        response.headers.set('X-Locale', locale);
        response.cookies.set(Constants.i18n.LOCALE_COOKIE_NAME, `${locale}${slugSuffix}`);
      }

      return response;
    };

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
        const user = await fetchSessionUser(token, config);
        return onNextResponse(user);
      } catch {
        return onNextResponse(null);
      }
    }

    try {
      // Execute pre-authentication hook; may throw error to prevent access
      await callback?.beforeAuth?.({ request, config, slug });

      // Extract token from header or cookie
      const token = extractToken(request);

      if (!token) {
        throw new AuthError({ message: 'Token not found', statusCode: 401 });
      }

      // Validate token has been signed by the server
      await verifyToken(token, keyOrSecret);

      // Retrieve additional user details from the backend
      // TODO: Optimize latency; caching or client optionally provides
      const user = await fetchSessionUser(token, config);

      // Ensure user has minimum role access
      const hasAccess =
        !restrictedRoles || Object.values(user.companies).some((role) => role && !restrictedRoles.includes(role));

      if (hasAccess) {
        const companyId = Object.keys(user.slugs).find((id) => user?.slugs[id] === slug);
        const isAdmin = !!companyId && user.companies[companyId] === 'ADMIN';

        // Execute post-authentication hook; may throw error to prevent access
        await callback?.afterAuth?.({ request, config, user, companyId, isAdmin, slug });

        return onNextResponse(user);
      }
    } catch (error) {
      console.error(error);
    }

    // Passively retrieve user details
    const user = await (async () => {
      try {
        const token = extractToken(request);
        return await fetchSessionUser(token, config);
      } catch {
        return null;
      }
    })();

    const companyId = Object.keys(user?.slugs ?? {}).find((id) => user?.slugs[id] === slug);

    // Determine login path
    const login = `${slugPath}${loginPath?.({ config, user, slug, companyId }) || '/login'}`;

    // Default redirection to login
    if (!pathname.startsWith(login) && pathname !== '/') {
      const loginUrl = new URL(login, request.url);
      loginUrl.searchParams.set('redirect', request.url);
      return NextResponse.redirect(loginUrl);
    }

    return onNextResponse(null);
  };

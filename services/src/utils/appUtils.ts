import { AppId, HikeEnvironment } from '@hike/types';
/**
 * Returns the app name for the given app.
 */
export const appName = (appId: AppId): string => {
  switch (appId) {
    case '@hike/insoles-web':
      return 'Insole.ai';
    default:
      return 'Hike';
  }
};

/**
 * Returns the API host for the given app and environment.
 */
export const apiHost = (appId: AppId, environment: HikeEnvironment) => {
  if (environment === 'development') {
    return 'localhost:8000';
  }

  switch (appId) {
    case '@hike/insoles-web':
      switch (environment) {
        case 'staging':
          return 'api-staging.insoles.ai';
        default:
          return 'api.insoles.ai';
      }
    default:
      switch (environment) {
        case 'staging':
          return 'api-staging.hike-medical-server.com';
        default:
          return 'api.hikemedical.com';
      }
  }
};

/**
 * Returns the app host for the given app and environment.
 */
export const appHost = (appId: AppId, environment: HikeEnvironment) => {
  switch (appId) {
    case '@hike/insoles-web':
      switch (environment) {
        case 'development':
          return 'localhost:3001';
        case 'staging':
          return 'app-staging.insoles.ai';
        default:
          return 'app.insoles.ai';
      }
    case '@hike/consumer-web':
      switch (environment) {
        case 'development':
          return 'localhost:3002';
        case 'staging':
          return 'appv2-staging.hike-medical-server.com';
        default:
          return 'appv2.hikemedical.com';
      }
    default:
      switch (environment) {
        case 'development':
          return 'localhost:8001';
        case 'staging':
          return 'admin-staging.hike-medical-server.com';
        default:
          return 'admin.hikemedical.com';
      }
  }
};

/**
 * Generates a frontend URL.
 */
export const generateFrontendUrl = ({
  appId,
  slug,
  pathname = '',
  params = {},
  environment
}: {
  appId: AppId;
  slug?: string;
  pathname?: string;
  params?: Record<string, string | null | undefined>;
  environment: HikeEnvironment;
}): string => {
  const protocol = environment === 'development' ? 'http' : 'https';
  const slugPath = slug ? `/${slug}` : '';
  const url = new URL(`${protocol}://${appHost(appId, environment)}${slugPath}${pathname}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
};

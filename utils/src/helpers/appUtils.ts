import { AppId, HikeConfig, HikeEnvironment } from '@hike/types';

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
 * Returns the API url for the given app and environment.
 */
export const apiUrl = (appId: AppId, environment: HikeEnvironment) => {
  if (environment === 'development') {
    return 'http://localhost:8000';
  }

  switch (appId) {
    case '@hike/insoles-web':
      switch (environment) {
        case 'staging':
          return 'https://api-staging.insoles.ai';
        default:
          return 'https://api.insoles.ai';
      }
    default:
      switch (environment) {
        case 'staging':
          return 'https://api-staging.hike-medical-server.com';
        default:
          return 'https://api.hikemedical.com';
      }
  }
};

/**
 * Returns the app url for the given app and environment.
 */
export const appUrl = (appId: AppId, environment: HikeEnvironment) => {
  switch (appId) {
    case '@hike/insoles-web':
      switch (environment) {
        case 'development':
          return 'http://localhost:3001';
        case 'staging':
          return 'https://app-staging.insoles.ai';
        default:
          return 'https://app.insoles.ai';
      }
    case '@hike/consumer-web':
      switch (environment) {
        case 'development':
          return 'http://localhost:3002';
        case 'staging':
          return 'https://app-staging.hike-medical-server.com';
        default:
          return 'https://app.hikemedical.com';
      }
    case '@hike/backend':
      switch (environment) {
        case 'development':
          return 'http://localhost:8000';
        case 'staging':
          return 'https://api-staging.hike-medical-server.com';
        default:
          return 'https://api.hikemedical.com';
      }
    default:
      switch (environment) {
        case 'development':
          return 'http://localhost:8001';
        case 'staging':
          return 'https://admin-staging.hike-medical-server.com';
        default:
          return 'https://admin.hikemedical.com';
      }
  }
};

/**
 * Generates base URLs.
 */
export const generateBaseUrls = (
  config: Pick<HikeConfig, 'appId' | 'appEnv' | 'apiUrl'>
): { baseAppUrl: string; baseApiUrl: string } => {
  const baseAppUrl = appUrl(config.appId, config.appEnv);
  const baseApiUrl = config.apiUrl || apiUrl(config.appId, config.appEnv);
  return { baseAppUrl, baseApiUrl: `${baseApiUrl}/v2` };
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
  const baseUrl = appUrl(appId, environment);
  const slugPath = slug ? `/${slug}` : '';
  const url = new URL(`${baseUrl}${slugPath}${pathname}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
};

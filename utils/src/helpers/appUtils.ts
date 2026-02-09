import { AppId, HikeConfig, HikeEnvironment } from '@hike/types';

/**
 * Returns the app name for the given app.
 */
export const appName = (appId: AppId): string => {
  switch (appId) {
    case '@hike/insoles-web':
      return 'Insoles.ai';
    case '@hike/stepzero-web':
      return 'Step Zero';
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
    case '@hike/stepzero-web':
      switch (environment) {
        case 'staging':
          return 'https://api-staging.step-zero.dev';
        default:
          return 'https://api.stepzero.ai';
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
 * Returns all valid app urls for the given app and environment.
 * The first element is the canonical (primary) url; the rest are legacy aliases.
 */
export const appUrls = (appId: AppId, environment: HikeEnvironment): [string, ...string[]] => {
  switch (appId) {
    case '@hike/insoles-web':
      switch (environment) {
        case 'development':
          return ['http://localhost:3001'];
        case 'staging':
          return ['https://clinical-staging.hike-medical-server.com', 'https://app-staging.insoles.ai'];
        default:
          return ['https://clinical.hikemedical.com', 'https://app.insoles.ai'];
      }
    case '@hike/consumer-web':
      switch (environment) {
        case 'development':
          return ['http://localhost:3002'];
        case 'staging':
          return ['https://app-staging.hike-medical-server.com'];
        default:
          return ['https://app.hikemedical.com'];
      }
    case '@hike/stepzero-web':
      switch (environment) {
        case 'development':
          return ['http://localhost:3012'];
        case 'staging':
          return ['https://app-staging.step-zero.dev'];
        default:
          return ['https://app.stepzero.ai'];
      }
    case '@hike/backend':
      switch (environment) {
        case 'development':
          return ['http://localhost:8000'];
        case 'staging':
          return ['https://api-staging.hike-medical-server.com'];
        default:
          return ['https://api.hikemedical.com'];
      }
    default:
      switch (environment) {
        case 'development':
          return ['http://localhost:8001'];
        case 'staging':
          return ['https://admin-staging.hike-medical-server.com'];
        default:
          return ['https://admin.hikemedical.com'];
      }
  }
};

/**
 * Returns the canonical (primary) app url for the given app and environment.
 */
export const appUrl = (appId: AppId, environment: HikeEnvironment): string => appUrls(appId, environment)[0];

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

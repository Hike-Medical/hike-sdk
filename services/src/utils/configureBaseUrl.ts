import { HikeConfig } from '@hike/types';
import { isLocalHost } from '@hike/utils';

interface BaseUrlConfigurationOptions {
  localHostUrl?: string;
  publicHostUrl?: string;
}

export const configureBaseUrl = (
  config: HikeConfig,
  options: BaseUrlConfigurationOptions = { localHostUrl: 'localhost:8000', publicHostUrl: 'api.hikemedical.com' }
): string => {
  const isDevelopment = config.appEnv === 'development';
  let backendHost = '';

  if (typeof config.apiHosts === 'string' && config.apiHosts) {
    backendHost = config.apiHosts;
  } else {
    backendHost =
      config.apiHosts?.[config.appHost ?? ''] || (isDevelopment ? options.localHostUrl : options.publicHostUrl);
  }

  const protocol = isLocalHost(backendHost) ? 'http' : 'https';
  return `${protocol}://${backendHost}`;
};

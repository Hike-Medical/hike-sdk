import type { HikeConfig } from '@hike/types';
import { backendApi } from './utils/backendApi';
import { configureBaseUrl } from './utils/configureBaseUrl';

/**
 * Provisions the services module.
 */
export const configureServices = (config: HikeConfig) => {
  backendApi.defaults.headers.common['x-api-key'] ??= config.apiKey;
  backendApi.defaults.headers.common['x-app-host'] ??= config.appHost;
  backendApi.defaults.headers.common['x-app-env'] ??= config.appEnv;
  backendApi.defaults.headers.common['x-app-id'] ??= config.appId;
  backendApi.defaults.headers.common['x-app-version'] ??= config.appVersion;
  backendApi.defaults.headers.common['x-company-id'] ??= config.companyId;
  backendApi.defaults.headers.common['x-time-zone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Set the base URL for backend API requests
  if (config.appHost || config.apiHosts || config.apiKey) {
    const baseUrl = configureBaseUrl(config);
    backendApi.defaults.baseURL = `${baseUrl}/v2`;
  }

  // Set the cookie for server-side requests
  if (config.cookies && typeof window === 'undefined') {
    backendApi.interceptors.request.use(
      (backendConfig) => {
        const newConfig = backendConfig;
        newConfig.headers.set('Cookie', config.cookies);
        return newConfig;
      },
      (error) => Promise.reject(error)
    );
  }

  // Remove sensitive information from config to avoid leaking it to the client
  const { apiKey: _apiKey, cookies: _cookies, ...safeConfig } = config;

  // Return safe config to initialize client-side if needed
  return safeConfig;
};

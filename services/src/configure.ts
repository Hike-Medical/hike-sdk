import type { HikeConfig } from '@hike/types';
import { generateBaseUrls } from '@hike/utils';
import { backendApi } from './utils/backendApi';

/**
 * Provisions the services module.
 */
export const configureServices = (config: HikeConfig): Omit<HikeConfig, 'apiKey' | 'cookies'> => {
  const { baseAppUrl, baseApiUrl } = generateBaseUrls(config);

  backendApi.defaults.headers.common['x-api-key'] ??= config.apiKey;
  backendApi.defaults.headers.common['x-app-url'] ??= baseAppUrl;
  backendApi.defaults.headers.common['x-app-env'] ??= config.appEnv;
  backendApi.defaults.headers.common['x-app-id'] ??= config.appId;
  backendApi.defaults.headers.common['x-app-version'] ??= config.appVersion;
  backendApi.defaults.headers.common['x-company-id'] ??= config.companyId;
  backendApi.defaults.headers.common['x-time-zone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Set the base URL for backend API requests
  if (baseApiUrl !== backendApi.defaults.baseURL) {
    backendApi.defaults.baseURL = baseApiUrl;
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

/**
 * Provisions the services with an auth bearer token.
 */
export const configureAuthorization = (token: string | null) => {
  backendApi.defaults.headers.common.Authorization = token && `Bearer ${token}`;
};

/**
 * Provisions the services with a company.
 */
export const configureCompany = (companyId: string) => {
  backendApi.defaults.headers.common['x-company-id'] = companyId;
};

/**
 * Provisions the services with a fingerprint.
 */
export const configureFingerprint = (fingerprint: string) => {
  backendApi.defaults.headers.common['x-fingerprint'] = fingerprint;
};

/**
 * Provisions the services with the network speed.
 */
export const configureNetworkSpeed = (speed?: string) => {
  backendApi.defaults.headers.common['x-network-speed'] = speed;
};

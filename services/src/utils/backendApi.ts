import type { HikeConfig } from '@hike/types';
import { currentUrl, isLocalHost } from '@hike/utils';
import { refreshToken } from '../auth/refreshToken';
import axios from 'axios';

/**
 * Instance for making backend API requests.
 */
export const backendApi = axios.create({
  withCredentials: true
});

// The current URL and workspace is added to all request headers via interceptor.
backendApi.interceptors.request.use(
  (config) => {
    const newConfig = config;
    const url = currentUrl();

    if (url) {
      newConfig.headers['x-current-url'] = url.href;
    }

    return newConfig;
  },
  (error) => Promise.reject(error)
);

backendApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const alreadyRefreshed = originalRequest._alreadyRefreshed;

    // Attempt to refresh the token
    if (error.response?.status === 401 && !alreadyRefreshed) {
      try {
        await refreshToken();
        return backendApi(originalRequest);
      } catch (refreshError) {
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Provisions the backend API instance with the provided confiurations.
 */
export const configureBackendApi = ({
  apiHosts,
  apiKey,
  appHost,
  appEnv,
  appId,
  appVersion,
  companyId
}: HikeConfig) => {
  const isDevelopment = appEnv === 'development';
  let backendHost = '';

  // Determine the URL of the backend API
  if (typeof apiHosts === 'string' && apiHosts) {
    backendHost = apiHosts;
  } else {
    backendHost = apiHosts?.[appHost ?? ''] || (isDevelopment ? 'localhost:8000' : 'api.hikemedical.com');
  }

  const protocol = isLocalHost(backendHost) ? 'http' : 'https';

  backendApi.defaults.baseURL = `${protocol}://${backendHost}/v2`;
  backendApi.defaults.headers.common['x-api-key'] ??= apiKey;
  backendApi.defaults.headers.common['x-app-host'] ??= appHost;
  backendApi.defaults.headers.common['x-app-env'] ??= appEnv;
  backendApi.defaults.headers.common['x-app-id'] ??= appId;
  backendApi.defaults.headers.common['x-app-version'] ??= appVersion;

  if (companyId) {
    configureBackendApiForCompany(companyId);
  }
};

/**
 * Provisions the backend API instance with company identifier on every request.
 */
export const configureBackendApiForCompany = (companyId: string) => {
  backendApi.defaults.headers.common['x-company-id'] = companyId;
};

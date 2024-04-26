import type { HikeConfig } from '@hike/types';
import { currentUrl, extractCompanyId } from '@hike/utils';
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

      if (!newConfig.headers['x-company-id']) {
        newConfig.headers['x-company-id'] = extractCompanyId(url);
      }
    }

    return newConfig;
  },
  (error) => Promise.reject(error)
);

/**
 * Provisions the backend API instance with the provided confiurations.
 */
export const configureBackendApi = ({ apiKey, appEnv, appId, appVersion }: HikeConfig) => {
  switch (appEnv) {
    case 'development':
      backendApi.defaults.baseURL = 'http://localhost:8000/v2';
      break;
    default:
      backendApi.defaults.baseURL = 'https://api.hikemedical.com/v2';
      break;
  }

  backendApi.defaults.headers.common['x-api-key'] = apiKey;
  backendApi.defaults.headers.common['x-app-env'] = appEnv;
  backendApi.defaults.headers.common['x-app-id'] = appId;
  backendApi.defaults.headers.common['x-app-version'] = appVersion;
};

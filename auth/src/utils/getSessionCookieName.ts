import { Constants } from '@hike/utils';

export const getSessionCookieName = (isHttps: boolean, type: 'access' | 'refresh' = 'access'): string => {
  const prefix = isHttps ? '__Secure-' : '';
  return `${prefix}${Constants.AUTH_COOKIE_NAME}${type === 'refresh' ? '-refresh' : ''}`;
};

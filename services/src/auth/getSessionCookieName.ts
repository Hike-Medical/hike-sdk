import { Constants } from '@hike/utils';

export const getSessionCookieName = (url?: string | null, type: 'access' | 'refresh' = 'access'): string => {
  const useSecureCookies = url?.startsWith('https://') ?? true;
  const prefix = useSecureCookies ? '__Secure-' : '';
  return `${prefix}${Constants.AUTH_COOKIE_NAME}${type === 'refresh' ? '-refresh' : ''}`;
};

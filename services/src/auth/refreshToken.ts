import type { AuthSession } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const refreshToken = async (token?: string, excludeCookie?: boolean): Promise<AuthSession> => {
  try {
    const queryString = excludeCookie === true ? '?exclude-cookie=true' : '';
    const response = await backendApi.post(`auth/refresh${queryString}`, { token });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

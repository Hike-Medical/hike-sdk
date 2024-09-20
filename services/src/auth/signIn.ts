import { AuthSession } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const signIn = async (
  credentials: { email: string; password: string },
  excludeCookie?: boolean
): Promise<AuthSession | null> => {
  try {
    const queryString = excludeCookie === true ? '?exclude-cookie=true' : '';
    const response = await backendApi.post(`auth/login${queryString}`, credentials);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

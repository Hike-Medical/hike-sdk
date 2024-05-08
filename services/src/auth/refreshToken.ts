import type { AuthUser } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const refreshToken = async (): Promise<{
  sessionUser: AuthUser;
  accessToken: string;
  refreshToken: string;
}> => {
  const response = await backendApi.post('auth/refresh');
  return response.data;
};

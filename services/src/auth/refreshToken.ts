import type { AuthSession } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const refreshToken = async (): Promise<AuthSession> => {
  const response = await backendApi.post('auth/refresh');
  return response.data;
};

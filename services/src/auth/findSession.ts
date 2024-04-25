import type { AuthUser } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const findSession = async (): Promise<AuthUser> => {
  const response = await backendApi.get('auth/session');
  return response.data;
};

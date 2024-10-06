import { AuthSession, SignInWithEmailParams } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const signInWithEmail = async (credentials: SignInWithEmailParams): Promise<AuthSession> => {
  const response = await backendApi.post('auth/magic-link', credentials);
  return response.data;
};

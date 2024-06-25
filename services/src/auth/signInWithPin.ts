import { AuthSession, SignInWithPinBody } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const signInWithPin = async (credentials: SignInWithPinBody): Promise<AuthSession> => {
  const response = await backendApi.post('auth/pin', credentials);
  return response.data;
};

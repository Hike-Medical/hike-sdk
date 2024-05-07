import { backendApi } from '../utils/backendApi';

export const signIn = async (credentials: { email: string; password: string }) => {
  const response = await backendApi.post('auth/login', credentials);
  return response.data;
};

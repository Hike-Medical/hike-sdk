import { backendApi } from '../utils/backendApi';

export const refreshToken = async () => {
  const response = await backendApi.post('auth/refresh');
  return response.data;
};

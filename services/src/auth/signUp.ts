import { backendApi } from '../utils/backendApi';

export const signUp = async (credentials: { email: string; password: string; companyId: string }) => {
  const response = await backendApi.post('auth/signup', credentials, {
    headers: {
      'x-company-id': credentials.companyId
    }
  });
  return response.data;
};

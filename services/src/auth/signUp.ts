import { backendApi } from '../utils/backendApi';

export const signUp = async (credentials: { name: string; email: string; password: string; companyId: string }) => {
  const response = await backendApi.post('auth/signup', credentials, {
    headers: {
      'x-company-id': credentials.companyId
    }
  });
  return response.data;
};

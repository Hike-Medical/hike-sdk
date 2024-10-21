import type { SafeCompany } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const findCompaniesBySession = async (): Promise<SafeCompany[]> => {
  const response = await backendApi.get('auth/session/companies');
  return response.data;
};

import type { Company } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const findCompaniesBySession = async (): Promise<Company[]> => {
  const response = await backendApi.get('auth/session/companies');
  return response.data;
};

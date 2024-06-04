import type { Company } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const findCompanyById = async (companyId: string): Promise<Company> => {
  const response = await backendApi.get(`auth/company/${companyId}`);
  return response.data;
};

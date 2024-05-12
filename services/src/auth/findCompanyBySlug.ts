import type { Company } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const findCompanyBySlug = async (slug: string): Promise<Company> => {
  const response = await backendApi.get(`auth/company/${slug}`);
  return response.data;
};

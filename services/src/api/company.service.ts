import { CompanyExtended } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const findCompanyPreferences = async (): Promise<CompanyExtended['preferences']> => {
  const response = await backendApi.get(`company/preferences`);
  return response.data;
};

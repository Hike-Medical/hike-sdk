import { AddCompanyParams, CompanyExtended } from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const findCompanyPreferences = async (): Promise<CompanyExtended['preferences']> => {
  try {
    const response = await backendApi.get(`company/preferences`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const isFreeTrial = async (): Promise<boolean> => {
  try {
    const response = await backendApi.get(`auth/isFreeTrial`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const addCompany = async (params: AddCompanyParams): Promise<CompanyExtended> => {
  try {
    const response = await backendApi.post(`company`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

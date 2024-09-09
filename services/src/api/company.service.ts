import { AddCompanyParams, CompanyExtended } from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const findCompanyPreferences = async (): Promise<CompanyExtended['preferences']> => {
  try {
    const response = await backendApi.get(`company/preferences`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const isDemoCompany = async (): Promise<boolean> => {
  try {
    const response = await backendApi.get(`company/isDemo`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const addCompany = async (params: AddCompanyParams): Promise<CompanyExtended> => {
  try {
    const response = await backendApi.post(`company`, params);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

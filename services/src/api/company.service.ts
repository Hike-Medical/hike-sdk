import { CompanyExtended } from '@hike/types';
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

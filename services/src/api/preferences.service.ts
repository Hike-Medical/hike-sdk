import { CompanyPreferences } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const findPreferences = async (facilityId?: string): Promise<CompanyPreferences> => {
  try {
    const response = await backendApi.get('preferences', { params: { facilityId } });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

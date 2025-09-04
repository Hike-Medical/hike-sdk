import { CompanyPreferences, OidcSettings } from '@hike/types';
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

export const findOidcPreferences = async (slug: string): Promise<OidcSettings> => {
  try {
    const response = await backendApi.get('preferences/oidc', { params: { slug } });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const isFreeTrial = async (facilityId?: string): Promise<boolean> => {
  try {
    const response = await backendApi.get('auth/isFreeTrial', { params: { facilityId } });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

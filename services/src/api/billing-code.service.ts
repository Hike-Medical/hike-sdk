import type { BillingCode, GetBillingCodesParams, PagedResponse, SearchBillingCodesParams } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const findBillingCodeById = async (billingCodeId: string): Promise<BillingCode> => {
  try {
    const response = await backendApi.get(`billing-code/${billingCodeId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * Fetches billing codes from the backend API.
 */
export const fetchBillingCodes = async (params?: GetBillingCodesParams): Promise<PagedResponse<BillingCode[]>> => {
  try {
    const response = await backendApi.get('billing-code', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const searchBillingCodes = async (params: SearchBillingCodesParams): Promise<PagedResponse<BillingCode[]>> => {
  try {
    const response = await backendApi.get('billing-code/search', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

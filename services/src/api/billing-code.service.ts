import type { BillingCode, GetBillingCodesParams, PagedResponse, SearchBillingCodesParams } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const findBillingCodeById = async (billingCodeId: string): Promise<BillingCode> => {
  const response = await backendApi.get(`billing-code/${billingCodeId}`);
  return response.data;
};

/**
 * Fetches billing codes from the backend API.
 */
export const fetchBillingCodes = async (params?: GetBillingCodesParams): Promise<PagedResponse<BillingCode[]>> => {
  const response = await backendApi.get('billing-code', { params });
  return response.data;
};

export const searchBillingCodes = async (params: SearchBillingCodesParams): Promise<PagedResponse<BillingCode[]>> => {
  const response = await backendApi.get('billing-code/search', { params });
  return response.data;
};

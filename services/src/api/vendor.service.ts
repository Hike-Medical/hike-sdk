import { GetOrthofeetInventoryResponse } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const fetchOrthofeetInventory = async (partNumber: string): Promise<GetOrthofeetInventoryResponse> => {
  try {
    const response = await backendApi.get(`vendor/orthofeet/inventory/${encodeURIComponent(partNumber)}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

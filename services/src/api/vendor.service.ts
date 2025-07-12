import { GetOrthofeetInventoryResponse } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const fetchOrthofeetInventory = async (
  partNumber: string | string[]
): Promise<GetOrthofeetInventoryResponse> => {
  try {
    if (Array.isArray(partNumber)) {
      const response = await backendApi.get(
        `vendor/orthofeet/inventory?partNumbers=${partNumber.map((item) => encodeURIComponent(item)).join(',')}`
      );
      return response.data;
    }

    const response = await backendApi.get(`vendor/orthofeet/inventory/${encodeURIComponent(partNumber)}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

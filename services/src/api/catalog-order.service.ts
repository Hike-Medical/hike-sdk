import type {
  CatalogOrderResponse,
  CreateCatalogOrderParams,
  CreateCatalogOrderResponse,
  GetCatalogOrdersParams,
  PagedResponse
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const createCatalogOrder = async (
  data: CreateCatalogOrderParams
): Promise<CreateCatalogOrderResponse> => {
  try {
    const response = await backendApi.post('catalog-order', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchCatalogOrders = async (
  params?: GetCatalogOrdersParams
): Promise<PagedResponse<CatalogOrderResponse[]>> => {
  try {
    const response = await backendApi.get('catalog-order', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

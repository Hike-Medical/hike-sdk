import type {
  CreateSampleKitOrderParams,
  CreateSampleKitOrderResponse,
  GetSampleKitOrdersParams,
  PagedResponse,
  SampleKitOrderResponse
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const createSampleKitOrder = async (
  data: CreateSampleKitOrderParams
): Promise<CreateSampleKitOrderResponse> => {
  try {
    const response = await backendApi.post('sample-kit-order', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchSampleKitOrders = async (
  params?: GetSampleKitOrdersParams
): Promise<PagedResponse<SampleKitOrderResponse[]>> => {
  try {
    const response = await backendApi.get('sample-kit-order', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

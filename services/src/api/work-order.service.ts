import type {
  CreateWorkOrderParams,
  GetWorkOrdersParams,
  PagedResponse,
  WorkOrderListItem,
  WorkOrderResult
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const fetchWorkOrders = async (
  params?: GetWorkOrdersParams
): Promise<PagedResponse<WorkOrderListItem[]>> => {
  try {
    const response = await backendApi.get('work-orders', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createWorkOrders = async (params: CreateWorkOrderParams): Promise<WorkOrderResult[]> => {
  try {
    const response = await backendApi.post('work-orders', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

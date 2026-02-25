import type { CreateWorkOrderParams, WorkOrderResult } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const createWorkOrders = async (params: CreateWorkOrderParams): Promise<WorkOrderResult[]> => {
  try {
    const response = await backendApi.post('work-orders', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

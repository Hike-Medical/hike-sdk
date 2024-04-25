import type { GetOrdersParams, Order, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { fetchOrders } from '../api/order.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseOrdersOptions extends GetOrdersParams {
  key?: string[];
  enabled?: boolean;
}

export const useOrders = ({ key = [], enabled = true, ...params }: UseOrdersOptions = {}) =>
  useQuery<PagedResponse<Order[]>, ResponseError<null>>({
    queryKey: ['orders', ...key, params],
    queryFn: async () => {
      try {
        return await fetchOrders(params);
      } catch (error) {
        const status = isAxiosError(error) ? error.status ?? 500 : 500;
        // TODO: Extract message from backend response
        throw new ResponseError<null>('There was an error retrieving orders', status, null);
      }
    },
    enabled
  });

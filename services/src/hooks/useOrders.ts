import type { GetOrdersParams, Order, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../api/order.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseOrdersOptions extends GetOrdersParams {
  key?: string[];
  enabled?: boolean;
}

export const useOrders = ({ key = [], enabled = true, ...params }: UseOrdersOptions = {}) =>
  useQuery<PagedResponse<Order[]>, ResponseError<null>>({
    queryKey: ['orders', ...key, params],
    queryFn: async () => await fetchOrders(params),
    enabled
  });

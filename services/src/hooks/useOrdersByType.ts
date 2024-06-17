import type { OrderExtended, OrderType, PagedParams, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchOrders, fetchOrdersByType } from '../api/order.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseOrdersByTypeOptions
  extends Omit<UseQueryOptions<PagedResponse<OrderExtended[]>, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  type?: OrderType;
  params?: PagedParams;
  searchQuery?: string;
  queryKey?: QueryKey;
}

export const useOrdersByType = ({ type, params, searchQuery, queryKey = [], ...options }: UseOrdersByTypeOptions) =>
  useQuery({
    queryKey: ['ordersByType', type, params, queryKey, searchQuery],
    queryFn: async () =>
      type ? await fetchOrdersByType(type, { ...params, searchQuery }) : await fetchOrders({ ...params, searchQuery }),
    ...options
  });

import { HikeError, fetchOrders, fetchOrdersByType } from '@hike/services';
import type { GetOrdersByTypeParams, OrderExtended, OrderType, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseOrdersByTypeOptions
  extends Omit<UseQueryOptions<PagedResponse<OrderExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  type?: OrderType;
  params?: GetOrdersByTypeParams;
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

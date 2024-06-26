import type { GetOrdersParams, OrderExtended, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../../api/order.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseOrdersOptions
  extends Omit<UseQueryOptions<PagedResponse<OrderExtended[]>, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetOrdersParams;
  queryKey?: QueryKey;
}

export const useOrders = ({ params, queryKey = [], ...options }: UseOrdersOptions = {}) =>
  useQuery({
    queryKey: ['orders', params, queryKey],
    queryFn: async () => await fetchOrders(params),
    ...options
  });

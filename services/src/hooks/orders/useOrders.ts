import type { GetOrdersParams, OrderExtended, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../../api/order.service';
import { HikeError } from '../../errors/HikeError';

interface UseOrdersOptions
  extends Omit<UseQueryOptions<PagedResponse<OrderExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetOrdersParams;
  queryKey?: QueryKey;
  companyIds?: string[];
}

export const useOrders = ({ params, companyIds, queryKey = [], ...options }: UseOrdersOptions = {}) =>
  useQuery({
    queryKey: ['orders', params, queryKey],
    queryFn: async () => await fetchOrders(params, companyIds),
    ...options
  });

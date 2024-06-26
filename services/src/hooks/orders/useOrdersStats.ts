import type { OrdersStats } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { statsForOrders } from '../../api/order.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseOrdersStatsOptions
  extends Omit<UseQueryOptions<OrdersStats, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useOrdersStats = ({ queryKey = [], ...options }: UseOrdersStatsOptions = {}) =>
  useQuery({
    queryKey: ['useOrdersStats', queryKey],
    queryFn: async () => await statsForOrders(),
    ...options
  });

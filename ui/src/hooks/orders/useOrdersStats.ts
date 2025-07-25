import { statsForOrders } from '@hike/services';
import type { OrdersStats } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseOrdersStatsOptions extends Omit<UseQueryOptions<OrdersStats, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useOrdersStats = ({ queryKey = [], ...options }: UseOrdersStatsOptions = {}) =>
  useQuery({
    queryKey: ['useOrdersStats', queryKey],
    queryFn: async () => await statsForOrders(),
    ...options
  });

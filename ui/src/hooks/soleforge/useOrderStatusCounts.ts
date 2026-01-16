import { getOrderStatusCounts } from '@hike/services';
import { GetOrderStatusCountsParams, HikeError, OrderStatusCount } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseOrderStatusCountsOptions {
  queryKey?: QueryKey;
  enabled?: boolean;
}

export const useOrderStatusCounts = (
  params?: GetOrderStatusCountsParams,
  options?: UseOrderStatusCountsOptions &
    Omit<UseQueryOptions<OrderStatusCount[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: options?.queryKey ?? ['orderStatusCounts', params],
    queryFn: async () => await getOrderStatusCounts(params),
    ...options
  });

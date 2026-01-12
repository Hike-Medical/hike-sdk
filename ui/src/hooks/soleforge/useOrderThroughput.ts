import { getOrderThroughput } from '@hike/services';
import { GetOrderThroughputParams, HikeError, OrderThroughputResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseOrderThroughputOptions {
  queryKey?: QueryKey;
  enabled?: boolean;
}

export const useOrderThroughput = (
  params: GetOrderThroughputParams,
  options?: UseOrderThroughputOptions &
    Omit<UseQueryOptions<OrderThroughputResponse, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: options?.queryKey ?? ['orderThroughput', params],
    queryFn: async () => await getOrderThroughput(params),
    ...options
  });

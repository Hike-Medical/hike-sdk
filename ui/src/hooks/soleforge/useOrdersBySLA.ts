import { getOrdersBySLA } from '@hike/services';
import { GetOrdersBySLAParams, HikeError, OrdersBySLAResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseOrdersBySLAOptions {
  queryKey?: QueryKey;
  enabled?: boolean;
}

export const useOrdersBySLA = (
  params?: GetOrdersBySLAParams,
  options?: UseOrdersBySLAOptions &
    Omit<UseQueryOptions<OrdersBySLAResponse, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: options?.queryKey ?? ['ordersBySLA', params],
    queryFn: async () => await getOrdersBySLA(params),
    refetchInterval: 30000, // Real-time 30s refresh
    ...options
  });

import { getOrdersByShipByAge } from '@hike/services';
import { GetOrdersByShipByAgeParams, HikeError, OrdersByShipByAgeResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseOrdersByShipByAgeOptions {
  queryKey?: QueryKey;
  enabled?: boolean;
}

export const useOrdersByShipByAge = (
  params?: GetOrdersByShipByAgeParams,
  options?: UseOrdersByShipByAgeOptions &
    Omit<UseQueryOptions<OrdersByShipByAgeResponse, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: options?.queryKey ?? ['ordersByShipByAge', params],
    queryFn: async () => await getOrdersByShipByAge(params),
    refetchInterval: 3000, // Real-time 30s refresh
    ...options
  });

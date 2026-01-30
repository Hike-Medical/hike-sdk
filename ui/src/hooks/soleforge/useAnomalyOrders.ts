import { getAnomalyOrders } from '@hike/services';
import { AnomalyOrdersResponse, GetAnomalyOrdersParams, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAnomalyOrdersOptions
  extends Omit<UseQueryOptions<AnomalyOrdersResponse, HikeError<null>>, 'queryFn' | 'queryKey'> {
  queryKey?: QueryKey;
}

export const useAnomalyOrders = (params?: GetAnomalyOrdersParams, options?: UseAnomalyOrdersOptions) =>
  useQuery<AnomalyOrdersResponse, HikeError<null>>({
    queryKey: ['anomalyOrders', params?.factoryNames, options?.queryKey],
    queryFn: async () => await getAnomalyOrders(params),
    ...options
  });

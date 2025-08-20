import { getOrderMetrics } from '@hike/services';
import { HikeError, OrderMetricsResponse } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetOrderMetricsOptions
  extends Omit<UseQueryOptions<OrderMetricsResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useGetOrderMetrics = ({ queryKey = [], ...options }: UseGetOrderMetricsOptions = {}) =>
  useQuery({
    queryKey: ['orderMetrics', queryKey],
    queryFn: async () => await getOrderMetrics(),
    ...options
  });

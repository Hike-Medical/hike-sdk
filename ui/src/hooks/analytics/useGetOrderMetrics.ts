import { getOrderMetrics } from '@hike/services';
import { HikeError, OrderMetricsOptions, OrderMetricsResponse } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetOrderMetricsOptions
  extends Omit<UseQueryOptions<OrderMetricsResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
  params?: OrderMetricsOptions;
}

export const useGetOrderMetrics = ({ queryKey = [], params, ...options }: UseGetOrderMetricsOptions = {}) =>
  useQuery({
    queryKey: ['orderMetrics', queryKey, params],
    queryFn: async () => await getOrderMetrics(params),
    ...options
  });

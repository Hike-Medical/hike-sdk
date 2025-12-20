import { getOrderMetricsByWeek } from '@hike/services';
import { HikeError, OrderMetricsByWeekResponse, OrderMetricsOptions } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetOrderMetricsByWeekOptions
  extends Omit<UseQueryOptions<OrderMetricsByWeekResponse[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
  params?: OrderMetricsOptions;
}

export const useGetOrderMetricsByWeek = ({ queryKey = [], params, ...options }: UseGetOrderMetricsByWeekOptions = {}) =>
  useQuery({
    queryKey: ['orderMetricsByWeek', queryKey, params],
    queryFn: async () => await getOrderMetricsByWeek(params),
    ...options
  });

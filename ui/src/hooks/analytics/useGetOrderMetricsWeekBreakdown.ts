import { getOrderMetricsWeekBreakdown } from '@hike/services';
import {
  HikeError,
  OrderMetricsWeekBreakdownOptions,
  OrderMetricsWeekBreakdownResponse
} from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetOrderMetricsWeekBreakdownOptions
  extends Omit<UseQueryOptions<OrderMetricsWeekBreakdownResponse[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
  params: OrderMetricsWeekBreakdownOptions;
}

export const useGetOrderMetricsWeekBreakdown = ({
  queryKey = [],
  params,
  ...options
}: UseGetOrderMetricsWeekBreakdownOptions) =>
  useQuery({
    queryKey: ['orderMetricsWeekBreakdown', queryKey, params],
    queryFn: async () => await getOrderMetricsWeekBreakdown(params),
    ...options
  });

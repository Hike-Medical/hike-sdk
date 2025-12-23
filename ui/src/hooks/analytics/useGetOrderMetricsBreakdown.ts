import { getOrderMetricsBreakdown } from '@hike/services';
import {
  HikeError,
  OrderMetricsBreakdownOptions,
  OrderMetricsBreakdownResponse
} from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetOrderMetricsBreakdownOptions
  extends Omit<UseQueryOptions<OrderMetricsBreakdownResponse[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
  params: OrderMetricsBreakdownOptions;
}

export const useGetOrderMetricsBreakdown = ({
  queryKey = [],
  params,
  ...options
}: UseGetOrderMetricsBreakdownOptions) =>
  useQuery({
    queryKey: ['orderMetricsBreakdown', queryKey, params],
    queryFn: async () => await getOrderMetricsBreakdown(params),
    ...options
  });


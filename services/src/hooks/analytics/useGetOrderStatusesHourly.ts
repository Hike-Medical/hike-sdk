import { HourlyOptions, OrderStatus } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getOrderStatusesPerHour } from '../../api/analytics.service';
import { HikeError } from '../../errors/HikeError';

interface HourlyResponse {
  status: OrderStatus;
  countsPerHour: Record<
    string,
    {
      total: number;
      users: Record<string, number>;
    }
  >;
}

interface UseGetOrderStatusesHourlyOptions
  extends Omit<UseQueryOptions<HourlyResponse[], HikeError<null>>, 'queryKey' | 'queryFn'> {}

export const useGetOrderStatusesHourly = (
  body: HourlyOptions,
  companyIds: string[],
  queryOptions?: UseGetOrderStatusesHourlyOptions
) =>
  useQuery({
    queryKey: ['orderStatusesHourly', body, companyIds],
    queryFn: async () => await getOrderStatusesPerHour(body, companyIds),
    ...queryOptions
  });

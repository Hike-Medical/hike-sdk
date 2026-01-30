import { getOrderStatusesPerHour } from '@hike/services';
import { HikeError, HourlyOptions, HourlyResponse } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

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

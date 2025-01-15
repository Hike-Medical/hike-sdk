import { OrderStatus } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getOrderStatusesPerHour } from '../../api/analytics.service';
import { HikeError } from '../../errors/HikeError';

interface DateFilter {
  startDate: string;
  endDate: string;
}

interface HourlyOptions {
  orderStatuses: OrderStatus[];
  dateFilters: DateFilter;
}

export interface UseGetOrderStatusesHourlyOptions
  extends Omit<UseQueryOptions<HourlyOptions, HikeError<null>>, 'queryKey' | 'queryFn'> {}

export const useGetOrderStatusesHourly = (body: HourlyOptions, queryOptions?: UseGetOrderStatusesHourlyOptions) => {
  return useQuery({
    queryKey: [
      'orderStatusesHourly',
      ...body.orderStatuses,
      { startDate: body.dateFilters?.startDate, endDate: body.dateFilters?.endDate }
    ],
    queryFn: async () => await getOrderStatusesPerHour(body.orderStatuses, body.dateFilters),
    ...queryOptions
  });
};

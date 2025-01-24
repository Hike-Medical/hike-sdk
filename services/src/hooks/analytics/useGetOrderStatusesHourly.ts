import { OrderStatus } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getOrderStatusesPerHour } from '../../api/analytics.service';
import { HikeError } from '../../errors/HikeError';

interface DateFilter {
  startDate: string;
  endDate: string;
}

interface HourlyOptions {
  companyIds: string[];
  orderStatuses: OrderStatus[];
  dateFilters: DateFilter;
}

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

export interface UseGetOrderStatusesHourlyOptions
  extends Omit<UseQueryOptions<HourlyResponse[], HikeError<null>>, 'queryKey' | 'queryFn'> {}

export const useGetOrderStatusesHourly = (body: HourlyOptions, queryOptions?: UseGetOrderStatusesHourlyOptions) => {
  return useQuery({
    queryKey: [
      'orderStatusesHourly',
      ...body.orderStatuses,
      ...body.companyIds,
      { startDate: body.dateFilters?.startDate, endDate: body.dateFilters?.endDate }
    ],
    queryFn: async () => await getOrderStatusesPerHour(body.orderStatuses, body.dateFilters, body.companyIds),
    ...queryOptions
  });
};

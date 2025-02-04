import { GetStuckOrdersByStatuses, OrderStuckResponse } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { HikeError } from '../../errors/HikeError';
import { getOrdersStuck } from '../../api/analytics.service';

interface UseGetOrdersStuckOptions
  extends Omit<UseQueryOptions<OrderStuckResponse[], HikeError<null>>, 'queryKey' | 'queryFn'> {}

export const useGetOrdersStuck = (body: GetStuckOrdersByStatuses, queryOptions?: UseGetOrdersStuckOptions) => {
  return useQuery({
    queryKey: ['ordersStuck', body.orderStatuses, body.days, body.startDate, body.endDate],
    queryFn: async () => await getOrdersStuck(body),
    ...queryOptions
  });
};

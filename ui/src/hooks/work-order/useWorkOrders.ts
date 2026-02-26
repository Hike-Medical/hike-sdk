import { fetchWorkOrders } from '@hike/services';
import type { GetWorkOrdersParams, HikeError, PagedResponse, WorkOrderListItem } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseWorkOrdersOptions
  extends Omit<UseQueryOptions<PagedResponse<WorkOrderListItem[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetWorkOrdersParams;
  queryKey?: QueryKey;
}

export const useWorkOrders = ({ params, queryKey = [], ...options }: UseWorkOrdersOptions = {}) =>
  useQuery({
    queryKey: ['workOrders', params, queryKey],
    queryFn: async () => await fetchWorkOrders(params),
    ...options
  });

import { getEmployerOrders } from '@hike/services';
import { FlattenedWorkbench, GetAggregatedParams, HikeError, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseEmployerOrdersOptions
  extends Omit<UseQueryOptions<PagedResponse<FlattenedWorkbench[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  params?: GetAggregatedParams;
  companyIds?: string[];
  queryKey?: QueryKey;
}

/**
 * Hook to fetch employer orders directly from the Order model.
 * This provides the same data format as useAggregatedWorkbenches but queries orders directly.
 */
export const useEmployerOrders = ({ params, companyIds, queryKey = [], ...options }: UseEmployerOrdersOptions) =>
  useQuery<PagedResponse<FlattenedWorkbench[]>, HikeError<null>>({
    queryKey: ['useEmployerOrders', params, companyIds, queryKey],
    queryFn: async () => await getEmployerOrders(params, companyIds),
    ...options
  });

import { getAggregatedWorkbenches } from '@hike/services';
import { FlattenedWorkbench, GetAggregatedParams, HikeError, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseAggregatedWorkbenchesOptions
  extends Omit<UseQueryOptions<PagedResponse<FlattenedWorkbench[]>, HikeError<null>>, 'queryFn' | 'queryKey'> {
  params?: GetAggregatedParams;
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useAggregatedWorkbenches = ({
  params,
  companyIds,
  queryKey = [],
  ...options
}: UseAggregatedWorkbenchesOptions) =>
  useQuery<PagedResponse<FlattenedWorkbench[]>, HikeError<null>>({
    queryKey: ['useAggregatedWorkbenches', params, companyIds, queryKey],
    queryFn: async () => await getAggregatedWorkbenches(params, companyIds),
    ...options
  });

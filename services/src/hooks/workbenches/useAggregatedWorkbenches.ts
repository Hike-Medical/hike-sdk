import { AggregatedWorkbenchResponse, GetAggregatedParams, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getAggregatedWorkbenches } from '../../api/workbench.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseAggregatedWorkbenchesOptions
  extends Omit<
    UseQueryOptions<PagedResponse<AggregatedWorkbenchResponse[]>, ResponseError<null>>,
    'queryFn' | 'queryKey'
  > {
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
  useQuery<PagedResponse<AggregatedWorkbenchResponse[]>, ResponseError<null>>({
    queryKey: ['useAggregatedWorkbenches', params, companyIds, queryKey],
    queryFn: async () => await getAggregatedWorkbenches(params, companyIds),
    ...options
  });

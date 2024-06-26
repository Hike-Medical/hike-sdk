import { AggregatedWorkbenchResponse, GetAggregatedParams, PagedResponse } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getAggregatedWorkbenches } from '../../api/workbench.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseAggregatedWorkbenchOptions
  extends Omit<
    UseQueryOptions<PagedResponse<AggregatedWorkbenchResponse[]>, ResponseError<null>>,
    'queryFn' | 'queryKey'
  > {
  params?: GetAggregatedParams;
  key?: string[];
  enabled?: boolean;
}

export const useAggregatedWorkbenches = ({ key = [], enabled = true, params }: UseAggregatedWorkbenchOptions) => {
  return useQuery<PagedResponse<AggregatedWorkbenchResponse[]>, ResponseError<null>>({
    queryKey: ['useAggregatedWorkbenches', ...key, params],
    queryFn: async () => await getAggregatedWorkbenches(params),
    enabled
  });
};

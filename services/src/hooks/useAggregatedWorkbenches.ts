import { AggregatedWorkbenchResponse, GetAggregatedParams } from '@hike/types';
import { ResponseError } from '../errors/ResponseError';
import { getAggregatedWorkbenches } from '../api/workbench.service';
import { useQuery } from '@tanstack/react-query';

export interface UseAggregatedWorkbenchOptions extends GetAggregatedParams {
  key?: string[];
  enabled?: boolean;
}

export const useAggregatedWorkbenches = ({ key = [], enabled = true, ...params }: UseAggregatedWorkbenchOptions) => {
  return useQuery<AggregatedWorkbenchResponse, ResponseError<null>>({
    queryKey: ['useAggregatedWorkbenches', ...key, params],
    queryFn: async () => await getAggregatedWorkbenches(params),
    enabled
  });
};

import { searchWorkflows } from '@hike/services';
import type { HikeError, SearchWorkflowsParams, WorkflowSearchResult } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseWorkflowsOptions
  extends Omit<UseQueryOptions<WorkflowSearchResult[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: SearchWorkflowsParams;
  queryKey?: QueryKey;
}

export const useWorkflows = ({ params, queryKey = [], ...options }: UseWorkflowsOptions = {}) =>
  useQuery({
    queryKey: ['workflows', params, queryKey],
    queryFn: async () => await searchWorkflows(params || {}),
    ...options
  });

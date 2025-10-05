import { getWorkflowFacts } from '@hike/services';
import type { HikeError, SearchWorkflowsParams, WorkflowFactsResult } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseWorkflowFactsOptions
  extends Omit<UseQueryOptions<WorkflowFactsResult[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: SearchWorkflowsParams;
  queryKey?: QueryKey;
}

export const useWorkflowFacts = ({ params, queryKey = [], ...options }: UseWorkflowFactsOptions = {}) =>
  useQuery({
    queryKey: ['workflow-facts', params, queryKey],
    queryFn: async () => await getWorkflowFacts(params ?? {}),
    ...options
  });

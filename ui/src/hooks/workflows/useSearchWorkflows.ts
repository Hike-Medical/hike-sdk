import { searchWorkflows } from '@hike/services';
import { HikeError, PagedResponse, SearchWorkflowsParams, WorkflowSearchResult } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseSearchWorkflowsOptions
  extends Omit<UseQueryOptions<PagedResponse<WorkflowSearchResult[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: SearchWorkflowsParams;
}

export const useSearchWorkflows = ({ params, ...queryOptions }: UseSearchWorkflowsOptions) =>
  useQuery({
    queryKey: ['searchWorkflows', params],
    queryFn: async () => await searchWorkflows(params),
    ...queryOptions
  });

import { getWorkflow } from '@hike/services';
import type { HikeError, WorkflowDto } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseWorkflowOptions extends Omit<UseQueryOptions<WorkflowDto, HikeError<null>>, 'queryKey' | 'queryFn'> {
  workflowId: string;
  queryKey?: QueryKey;
}

export const useWorkflow = ({ workflowId, queryKey = [], ...options }: UseWorkflowOptions) =>
  useQuery({
    queryKey: ['workflow', workflowId, queryKey],
    queryFn: async () => await getWorkflow(workflowId),
    ...options
  });

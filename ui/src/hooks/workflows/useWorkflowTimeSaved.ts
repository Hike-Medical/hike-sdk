import { getWorkflowTimeSaved } from '@hike/services';
import type { HikeError, WorkflowTimeSaved } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseWorkflowTimeSavedOptions
  extends Omit<UseQueryOptions<WorkflowTimeSaved, HikeError<null>>, 'queryKey' | 'queryFn'> {
  workflowId: string;
  queryKey?: QueryKey;
}

export const useWorkflowTimeSaved = ({ workflowId, queryKey = [], ...options }: UseWorkflowTimeSavedOptions) =>
  useQuery({
    queryKey: ['workflow-time-saved', workflowId, queryKey],
    queryFn: async () => await getWorkflowTimeSaved(workflowId),
    enabled: !!workflowId,
    ...options
  });

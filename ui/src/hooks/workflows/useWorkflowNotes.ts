import { getWorkflowNotes } from '@hike/services';
import type { HikeError, WorkflowNote } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseWorkflowNotesOptions
  extends Omit<UseQueryOptions<WorkflowNote[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  workflowId: string;
  queryKey?: QueryKey;
}

export const useWorkflowNotes = ({ workflowId, queryKey = [], ...options }: UseWorkflowNotesOptions) =>
  useQuery({
    queryKey: ['workflowNotes', workflowId, queryKey],
    queryFn: async () => await getWorkflowNotes(workflowId),
    ...options
  });

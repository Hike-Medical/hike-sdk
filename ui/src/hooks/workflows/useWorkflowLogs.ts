import { getWorkflowLogs } from '@hike/services';
import type { WorkflowLogDto } from '@hike/types';
import { useQuery } from '@tanstack/react-query';

export const useWorkflowLogs = (workflowId: string) => {
  return useQuery<WorkflowLogDto[]>({
    queryKey: ['workflow-logs', workflowId],
    queryFn: () => getWorkflowLogs(workflowId)
  });
};

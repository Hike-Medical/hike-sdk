import type { WorkflowLogDto } from '@hike/services';
import { getWorkflowLogs } from '@hike/services';
import { useQuery } from '@tanstack/react-query';

export const useWorkflowLogs = (workflowId: string) => {
  return useQuery<WorkflowLogDto[]>({
    queryKey: ['workflow-logs', workflowId],
    queryFn: () => getWorkflowLogs(workflowId)
  });
};

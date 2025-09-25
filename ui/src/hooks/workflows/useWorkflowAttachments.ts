import { getWorkflowAttachments } from '@hike/services';
import { useQuery } from '@tanstack/react-query';

export const useWorkflowAttachments = (workflowId: string) => {
  return useQuery({
    queryKey: ['workflow-attachments', workflowId],
    queryFn: () => getWorkflowAttachments(workflowId),
    enabled: !!workflowId
  });
};

import { useQuery } from '@tanstack/react-query';
import { getWorkflowAttachments } from '@hike/services';

export const useWorkflowAttachments = (workflowId: string) => {
  return useQuery({
    queryKey: ['workflow-attachments', workflowId],
    queryFn: () => getWorkflowAttachments(workflowId),
    enabled: !!workflowId
  });
};

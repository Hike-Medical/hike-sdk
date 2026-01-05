import { updateWorkflowAttachment } from '@hike/services';
import { UpdateWorkflowAttachmentParams, WorkflowDto } from '@hike/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseUpdateWorkflowAttachmentParams {
  workflowId: string;
  onSuccess?: (data: WorkflowDto) => void;
  onError?: (error: Error) => void;
}

export interface UpdateWorkflowAttachmentInput {
  attachmentId: string;
  params: UpdateWorkflowAttachmentParams;
}

export const useUpdateWorkflowAttachment = ({
  workflowId,
  onSuccess,
  onError
}: UseUpdateWorkflowAttachmentParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ attachmentId, params }: UpdateWorkflowAttachmentInput) =>
      updateWorkflowAttachment(workflowId, attachmentId, params),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['workflow', workflowId] });
      queryClient.invalidateQueries({ queryKey: ['workflow-attachments', workflowId] });
      queryClient.invalidateQueries({ queryKey: ['workflow-logs', workflowId] });
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    }
  });
};

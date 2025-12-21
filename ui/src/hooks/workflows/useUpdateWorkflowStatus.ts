import { updateWorkflowStatus } from '@hike/services';
import { WorkflowDto, WorkflowStatus } from '@hike/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseUpdateWorkflowStatusParams {
  workflowId: string;
  onSuccess?: (data: WorkflowDto) => void;
  onError?: (error: Error) => void;
}

export interface UpdateWorkflowStatusInput {
  status: WorkflowStatus;
  reason?: string;
}

export const useUpdateWorkflowStatus = ({
  workflowId,
  onSuccess,
  onError
}: UseUpdateWorkflowStatusParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateWorkflowStatusInput) => updateWorkflowStatus(workflowId, params),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['workflow', workflowId] });
      queryClient.invalidateQueries({ queryKey: ['workflow-logs', workflowId] });
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      onError?.(error);
    }
  });
};

import { updateWorkflowState } from '@hike/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseUpdateWorkflowStateParams {
  workflowId: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useUpdateWorkflowState = ({ workflowId, onSuccess, onError }: UseUpdateWorkflowStateParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (stateUpdate: { facts?: { key: string; value: any; source?: string }[]; resolvedFactIds?: string[] }) =>
      updateWorkflowState(workflowId, stateUpdate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow', workflowId] });
      queryClient.invalidateQueries({ queryKey: ['workflowFactsByIds', workflowId] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    }
  });
};

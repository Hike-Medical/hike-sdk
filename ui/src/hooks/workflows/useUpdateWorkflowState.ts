import { updateWorkflowState } from '@hike/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseUpdateWorkflowStateParams {
  workflowId: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export interface UpdateWorkflowStateInput {
  facts?: { key: string; value: any; source?: string }[];
  attachmentFacts?: {
    attachment: {
      name: string;
      bucket: string;
      key: string;
      region: string;
      types: string[];
    };
    facts?: { key: string; value: any; source?: string }[];
  }[];
  resolvedFactIds?: string[];
}

export const useUpdateWorkflowState = ({ workflowId, onSuccess, onError }: UseUpdateWorkflowStateParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (stateUpdate: UpdateWorkflowStateInput) => updateWorkflowState(workflowId, stateUpdate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow', workflowId] });
      queryClient.invalidateQueries({ queryKey: ['workflowFactsByIds', workflowId] });
      queryClient.invalidateQueries({ queryKey: ['workflow-logs', workflowId] });
      onSuccess?.();
    },
    onError: (error: Error) => {
      onError?.(error);
    }
  });
};

import { updateWorkflowFacts } from '@hike/services';
import type { HikeError } from '@hike/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UseUpdateWorkflowFactsOptions {
  onSuccess?: () => void;
  onError?: (error: HikeError<null>) => void;
}

export const useUpdateWorkflowFacts = ({ onSuccess, onError }: UseUpdateWorkflowFactsOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workflowId,
      facts
    }: {
      workflowId: string;
      facts: Array<{ key: string; value: any; source?: string }>;
    }) => updateWorkflowFacts(workflowId, facts),
    onSuccess: (_, { workflowId }) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: ['workflow-facts'] });
      queryClient.invalidateQueries({ queryKey: ['workflow'] });
      queryClient.invalidateQueries({ queryKey: ['workflow-logs', workflowId] });
      onSuccess?.();
    },
    onError: (error: HikeError<null>) => {
      onError?.(error);
    }
  });
};

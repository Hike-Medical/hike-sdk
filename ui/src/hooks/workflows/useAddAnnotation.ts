import { addAnnotation } from '@hike/services';
import type { AnnotationDto, CreateAnnotationParams, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

interface AddAnnotationVariables {
  workflowId: string;
  attachmentId: string;
  params: CreateAnnotationParams;
}

export const useAddAnnotation = (
  options?: UseMutationOptions<AnnotationDto, HikeError<null>, AddAnnotationVariables>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addAnnotation'],
    mutationFn: async ({ workflowId, attachmentId, params }) =>
      await addAnnotation(workflowId, attachmentId, params),
    onSuccess: (data, variables, context) => {
      // Invalidate workflow queries to refresh annotation data
      queryClient.invalidateQueries({ queryKey: ['workflow', variables.workflowId] });
      queryClient.invalidateQueries({ queryKey: ['workflow-attachments', variables.workflowId] });
      queryClient.invalidateQueries({
        queryKey: ['annotations', variables.workflowId, variables.attachmentId]
      });
      options?.onSuccess?.(data, variables, context);
    },
    ...options
  });
};

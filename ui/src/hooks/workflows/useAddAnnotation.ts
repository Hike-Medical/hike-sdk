import { addAnnotation } from '@hike/services';
import type { AnnotationDto, CreateAnnotationParams, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

interface AddAnnotationVariables {
  attachmentId: string;
  params: CreateAnnotationParams;
}

export const useAddAnnotation = (
  options?: UseMutationOptions<AnnotationDto, HikeError<null>, AddAnnotationVariables>
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation({
    mutationKey: ['addAnnotation'],
    mutationFn: async ({ attachmentId, params }) => await addAnnotation(attachmentId, params),
    ...restOptions,
    onSuccess: (data, variables, onMutateResult) => {
      // Invalidate search-attachments queries to refresh the list
      queryClient.invalidateQueries({ queryKey: ['search-attachments'] });
      onSuccess?.(data, variables, onMutateResult);
    }
  });
};

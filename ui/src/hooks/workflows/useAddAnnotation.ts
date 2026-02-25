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
  return useMutation({
    ...options,
    mutationKey: ['addAnnotation'],
    mutationFn: async ({ attachmentId, params }) => await addAnnotation(attachmentId, params),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['search-attachments'] });
      options?.onSuccess?.(...args);
    }
  });
};

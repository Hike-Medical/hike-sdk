import { deleteTemplate } from '@hike/services';
import { HikeError } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useDeleteFormTemplate = (options?: UseMutationOptions<void, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['deleteTemplate'],
    mutationFn: async (templateID) => await deleteTemplate(templateID),
    ...options
  });

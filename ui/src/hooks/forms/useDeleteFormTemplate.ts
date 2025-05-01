import { deleteTemplate, HikeError } from '@hike/services';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useDeleteFormTemplate = (mutationOptions?: UseMutationOptions<void, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['deleteTemplate'],
    mutationFn: async (templateID) => await deleteTemplate(templateID),
    ...mutationOptions
  });

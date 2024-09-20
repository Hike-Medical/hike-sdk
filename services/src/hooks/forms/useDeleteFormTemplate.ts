import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteTemplate } from '../../api/form.service';
import { HikeError } from '../../errors/HikeError';

export const useDeleteFormTemplate = (mutationOptions?: UseMutationOptions<void, HikeError<null>, string>) => {
  return useMutation({
    mutationKey: ['deleteTemplate'],
    mutationFn: async (templateID: string) => await deleteTemplate(templateID),
    ...mutationOptions
  });
};

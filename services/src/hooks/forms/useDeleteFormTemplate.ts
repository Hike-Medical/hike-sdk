import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteTemplate } from '../../api/form.service';
import { HikeError } from '../../errors/HikeError';

export const useDeleteFormTemplate = (mutationOptions?: UseMutationOptions<void, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['deleteTemplate'],
    mutationFn: async (templateID) => await deleteTemplate(templateID),
    ...mutationOptions
  });

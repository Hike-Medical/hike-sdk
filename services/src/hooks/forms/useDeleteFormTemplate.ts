import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteTemplate } from '../../api/form.service';

export const useDeleteFormTemplate = (mutationOptions?: UseMutationOptions<void, unknown, string>) => {
  return useMutation<void, unknown, string>({
    mutationKey: ['deleteTemplate'],
    mutationFn: async (templateID: string) => await deleteTemplate(templateID),
    ...mutationOptions
  });
};

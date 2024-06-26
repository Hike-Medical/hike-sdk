import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteTemplate } from '../../api/form.service';
import { ResponseError } from '../../errors/ResponseError';

export const useDeleteFormTemplate = (mutationOptions?: UseMutationOptions<void, ResponseError<null>, string>) => {
  return useMutation({
    mutationKey: ['deleteTemplate'],
    mutationFn: async (templateID: string) => await deleteTemplate(templateID),
    ...mutationOptions
  });
};

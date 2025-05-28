import { deleteEmailTemplate } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UseDeleteEmailTemplateOptions {
  templateId: string;
}

export const useDeleteEmailTemplate = (
  options?: UseMutationOptions<void, HikeError<null>, UseDeleteEmailTemplateOptions>
) =>
  useMutation({
    mutationKey: ['deleteEmailTemplate'],
    mutationFn: async ({ templateId }) => deleteEmailTemplate(templateId),
    ...options
  });

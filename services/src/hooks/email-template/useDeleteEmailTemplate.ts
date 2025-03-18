import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { deleteEmailTemplate } from '../../api/email-template.service';
import { HikeError } from '../../errors/HikeError';

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

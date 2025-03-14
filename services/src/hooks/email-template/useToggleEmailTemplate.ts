import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { activateEmailTemplate, deactivateEmailTemplate } from '../../api/email-template.service';
import { HikeError } from '../../errors/HikeError';

interface UseToggleEmailTemplateOptions {
  templateId: string;
  active: boolean;
}

export const useToggleEmailTemplate = (
  options?: UseMutationOptions<void, HikeError<null>, UseToggleEmailTemplateOptions>
) =>
  useMutation({
    mutationKey: ['toggleEmailTemplate'],
    mutationFn: async ({ templateId, active }) =>
      active ? await activateEmailTemplate(templateId) : await deactivateEmailTemplate(templateId),
    ...options
  });

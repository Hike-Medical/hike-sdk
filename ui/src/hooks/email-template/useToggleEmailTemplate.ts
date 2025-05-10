import { HikeError, activateEmailTemplate, deactivateEmailTemplate } from '@hike/services';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

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

import { EmailTemplate, UpsertEmailTemplateParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { upsertEmailTemplate } from '../../api/email-template.service';
import { HikeError } from '../../errors/HikeError';

interface UpsertEmailTemplateContext {
  body: UpsertEmailTemplateParams;
}

export const useUpsertEmailTemplate = (
  options?: UseMutationOptions<EmailTemplate, HikeError<null>, UpsertEmailTemplateContext>
) => {
  return useMutation({
    mutationKey: ['upsertEmailTemplates'],
    mutationFn: async ({ body }: UpsertEmailTemplateContext) => await upsertEmailTemplate(body),
    ...options
  });
};

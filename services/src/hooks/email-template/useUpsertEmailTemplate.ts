import { EmailTemplate, UpsertEmailTemplateParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { upsertEmailTemplate } from '../../api/email-template.service';
import { HikeError } from '../../errors/HikeError';

interface UpsertEmailTemplateContext {
  params: UpsertEmailTemplateParams;
}

export const useUpsertEmailTemplate = (
  options?: UseMutationOptions<EmailTemplate, HikeError<null>, UpsertEmailTemplateContext>
) =>
  useMutation({
    mutationKey: ['upsertEmailTemplates'],
    mutationFn: async ({ params }) => await upsertEmailTemplate(params),
    ...options
  });

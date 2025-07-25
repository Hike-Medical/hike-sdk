import { sendEmailTemplate } from '@hike/services';
import { HikeError, SendEmailTemplateParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface SendEmailTemplateContext {
  templateId: string;
  params: SendEmailTemplateParams;
}

export const useSendEmailTemplate = (options?: UseMutationOptions<void, HikeError<null>, SendEmailTemplateContext>) =>
  useMutation({
    mutationKey: ['sendEmailTemplate'],
    mutationFn: async ({ templateId, params }) => await sendEmailTemplate(templateId, params),
    ...options
  });

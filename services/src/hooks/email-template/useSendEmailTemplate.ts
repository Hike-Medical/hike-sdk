import { SendEmailTemplateParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { sendEmailTemplate } from '../../api/email-template.service';
import { HikeError } from '../../errors/HikeError';

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

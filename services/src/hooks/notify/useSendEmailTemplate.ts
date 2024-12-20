import { SendEmailTemplateParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { sendEmailTemplate } from '../../api/notify.service';
import { HikeError } from '../../errors/HikeError';

interface SendEmailTemplateContext {
  templateId: string;
  params: SendEmailTemplateParams;
}

export const useSendEmailTemplate = (options?: UseMutationOptions<void, HikeError<null>, SendEmailTemplateContext>) => {
  return useMutation({
    mutationKey: ['sendEmailTemplate'],
    mutationFn: async ({ templateId, params }: SendEmailTemplateContext) => await sendEmailTemplate(templateId, params),
    ...options
  });
};

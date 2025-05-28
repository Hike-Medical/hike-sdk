import { upsertEmailTemplate } from '@hike/services';
import { EmailTemplate, HikeError, UpsertEmailTemplateParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUpsertEmailTemplate = (
  options?: UseMutationOptions<EmailTemplate, HikeError<null>, UpsertEmailTemplateParams>
) =>
  useMutation({
    mutationKey: ['upsertEmailTemplates'],
    mutationFn: async (params) => await upsertEmailTemplate(params),
    ...options
  });

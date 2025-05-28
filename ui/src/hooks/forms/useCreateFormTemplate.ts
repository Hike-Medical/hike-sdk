import { createFormTemplate } from '@hike/services';
import { CreateFormTemplateBody, FormTemplateResponse, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateFormTemplate = (
  options?: Omit<
    UseMutationOptions<FormTemplateResponse, HikeError<null>, CreateFormTemplateBody>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['createFormTemplate'],
    mutationFn: async (params) => await createFormTemplate(params),
    ...options
  });

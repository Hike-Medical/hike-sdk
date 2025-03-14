import { CreateFormTemplateBody, FormTemplateResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createFormTemplate } from '../../api/form.service';
import { HikeError } from '../../errors/HikeError';

export const useCreateFormTemplate = (
  mutationOptions?: Omit<
    UseMutationOptions<FormTemplateResponse, HikeError<null>, CreateFormTemplateBody>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['createFormTemplate'],
    mutationFn: async (params) => await createFormTemplate(params),
    ...mutationOptions
  });

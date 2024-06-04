import { CreateFormTemplateBody, FormTemplateResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createFormTemplate } from '../api/form.service';

export const useCreateFormTemplate = (
  mutationOptions?: Omit<
    UseMutationOptions<FormTemplateResponse, Error, CreateFormTemplateBody>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation({
    mutationKey: ['createFormTemplate'],
    mutationFn: async (params: CreateFormTemplateBody) => await createFormTemplate(params),
    ...mutationOptions
  });
};

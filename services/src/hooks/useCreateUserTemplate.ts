import { FormTemplateResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { CreateUserTemplateBody, createUserTemplate } from '../api/form.service';

export const useCreateUserTemplate = (
  mutationOptions?: Omit<
    UseMutationOptions<FormTemplateResponse, Error, CreateUserTemplateBody>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation({
    mutationKey: ['createUserTemplate'],
    mutationFn: async (params: CreateUserTemplateBody) => await createUserTemplate(params),
    ...mutationOptions
  });
};

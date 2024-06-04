import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { CreateUserTemplateBody, createUserTemplate } from '../api/form.service';
import { UserTemplateResponse } from '@hike/types';

export const useCreateUserTemplate = (
  mutationOptions?: Omit<
    UseMutationOptions<UserTemplateResponse, Error, CreateUserTemplateBody>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation({
    mutationKey: ['createUserTemplate'],
    mutationFn: async (params: CreateUserTemplateBody) => await createUserTemplate(params),
    ...mutationOptions
  });
};

import { UserTemplateResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { UpdateUserTemplateBody, updateUserTemplate } from '../api/form.service';

interface UpdateUserTemplateParams {
  userTemplateId: string;
  body: UpdateUserTemplateBody;
}

export const useUpdateUserTemplate = (
  mutationOptions?: Omit<
    UseMutationOptions<UserTemplateResponse, Error, UpdateUserTemplateParams>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation({
    mutationKey: ['updateUserTemplate'],
    mutationFn: async (params: UpdateUserTemplateParams) =>
      await updateUserTemplate(params.userTemplateId, params.body),
    ...mutationOptions
  });
};

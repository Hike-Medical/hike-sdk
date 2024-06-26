import { FormTemplateResponse, UpdateFormTemplateBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateFormTemplate } from '../../api/form.service';

interface UpdateFormTemplateParams {
  templateId: string;
  body: UpdateFormTemplateBody;
}

export const useUpdateFormTemplate = (
  mutationOptions?: Omit<
    UseMutationOptions<FormTemplateResponse, Error, UpdateFormTemplateParams>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation({
    mutationKey: ['updateFormTemplate'],
    mutationFn: async (params: UpdateFormTemplateParams) => await updateFormTemplate(params.templateId, params.body),
    ...mutationOptions
  });
};

import { FormTemplateResponse, UpdateFormTemplateBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateFormTemplate } from '../../api/form.service';
import { HikeError } from '../../errors/HikeError';

interface UpdateFormTemplateParams {
  templateId: string;
  body: UpdateFormTemplateBody;
}

export const useUpdateFormTemplate = (
  mutationOptions?: Omit<
    UseMutationOptions<FormTemplateResponse, HikeError<null>, UpdateFormTemplateParams>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation({
    mutationKey: ['updateFormTemplate'],
    mutationFn: async (params: UpdateFormTemplateParams) => await updateFormTemplate(params.templateId, params.body),
    ...mutationOptions
  });
};

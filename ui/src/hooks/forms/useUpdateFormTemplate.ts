import { updateFormTemplate } from '@hike/services';
import { FormTemplateResponse, HikeError, UpdateFormTemplateBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UpdateFormTemplateParams {
  templateId: string;
  body: UpdateFormTemplateBody;
}

export const useUpdateFormTemplate = (
  mutationOptions?: Omit<
    UseMutationOptions<FormTemplateResponse, HikeError<null>, UpdateFormTemplateParams>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['updateFormTemplate'],
    mutationFn: async (params) => await updateFormTemplate(params.templateId, params.body),
    ...mutationOptions
  });

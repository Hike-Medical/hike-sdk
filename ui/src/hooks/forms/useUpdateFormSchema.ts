import { updateFormSchema } from '@hike/services';
import { FormSchemaTyped, HikeError, UpdateFormSchemaBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UpdateFormSchemaParams {
  schemaId: string;
  body: UpdateFormSchemaBody;
}

export const useUpdateFormSchema = (
  options?: Omit<
    UseMutationOptions<FormSchemaTyped, HikeError<null>, UpdateFormSchemaParams>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['updateFormSchema'],
    mutationFn: async (params) => await updateFormSchema(params.schemaId, params.body),
    ...options
  });

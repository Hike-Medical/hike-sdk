import { FormSubmissionTyped, UpsertFormSubmissionParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { upsertFormSubmission } from '../../api/form.service';
import { ResponseError } from '../../errors/ResponseError';

export const useUpsertSubmission = (
  mutationOptions?: Omit<
    UseMutationOptions<FormSubmissionTyped, ResponseError<null>, UpsertFormSubmissionParams>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation({
    mutationKey: ['upsertSubmission'],
    mutationFn: async (params: UpsertFormSubmissionParams) => await upsertFormSubmission(params),
    ...mutationOptions
  });
};

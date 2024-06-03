import { FormSubmissionTyped, UpsertFormSubmissionParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { upsertFormSubmission } from '../api/form.service';

export const useUpsertSubmission = (
  mutationOptions?: Omit<
    UseMutationOptions<FormSubmissionTyped, Error, UpsertFormSubmissionParams>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation({
    mutationKey: ['upsertSubmission'],
    mutationFn: async (params: UpsertFormSubmissionParams) => await upsertFormSubmission(params),
    ...mutationOptions
  });
};

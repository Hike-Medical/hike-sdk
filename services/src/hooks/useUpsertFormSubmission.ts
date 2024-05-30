import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { FormSubmissionExtended, UpsertFormSubmissionParams } from '@hike/types';
import { upsertFormSubmission } from '../api/form.service';

export const useUpsertSubmission = (
  mutationOptions?: Omit<
    UseMutationOptions<FormSubmissionExtended, Error, UpsertFormSubmissionParams>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation({
    mutationKey: ['upsertSubmission'],
    mutationFn: async (params: UpsertFormSubmissionParams) => await upsertFormSubmission(params),
    ...mutationOptions
  });
};

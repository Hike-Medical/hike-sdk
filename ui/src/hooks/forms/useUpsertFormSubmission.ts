import { upsertFormSubmission } from '@hike/services';
import { FormSubmissionTyped, HikeError, UpsertFormSubmissionParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUpsertSubmission = (
  mutationOptions?: Omit<
    UseMutationOptions<FormSubmissionTyped, HikeError<null>, UpsertFormSubmissionParams>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['upsertSubmission'],
    mutationFn: async (params) => await upsertFormSubmission(params),
    ...mutationOptions
  });

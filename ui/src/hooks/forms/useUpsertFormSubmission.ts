import { upsertFormSubmission } from '@hike/services';
import { FormSubmissionTyped, HikeError, UpsertFormSubmissionParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUpsertSubmission = (
  options?: Omit<
    UseMutationOptions<FormSubmissionTyped, HikeError<null>, UpsertFormSubmissionParams>,
    'mutationKey' | 'mutationFn'
  >
) =>
  useMutation({
    mutationKey: ['upsertSubmission'],
    mutationFn: async (params) => await upsertFormSubmission(params),
    ...options
  });

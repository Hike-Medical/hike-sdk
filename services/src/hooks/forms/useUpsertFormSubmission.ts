import { FormSubmissionTyped, UpsertFormSubmissionParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { upsertFormSubmission } from '../../api/form.service';
import { HikeError } from '../../errors/HikeError';

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

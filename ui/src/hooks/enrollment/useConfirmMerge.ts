import { confirmEnrollmentMerge } from '@hike/services';
import type { ConfirmEnrollmentMergeParams, HikeError } from '@hike/types';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

export const useConfirmEnrollmentMerge = (
  options?: Omit<UseMutationOptions<{ patientId: string }, HikeError<null>, ConfirmEnrollmentMergeParams>, 'mutationFn'>
) =>
  useMutation<{ patientId: string }, HikeError<null>, ConfirmEnrollmentMergeParams>({
    mutationFn: confirmEnrollmentMerge,
    ...options
  });

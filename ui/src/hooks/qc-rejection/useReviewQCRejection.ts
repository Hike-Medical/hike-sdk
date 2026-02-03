import { reviewQCRejection } from '@hike/services';
import type { HikeError, QCRejection, ReviewQCRejectionParams } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useReviewQCRejection = (
  options?: UseMutationOptions<QCRejection, HikeError<null>, ReviewQCRejectionParams>
) =>
  useMutation({
    mutationKey: ['reviewQCRejection'],
    mutationFn: async (params) => await reviewQCRejection(params),
    ...options
  });

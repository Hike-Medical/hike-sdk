import { createQCRejectionReason } from '@hike/services';
import type { CreateQCRejectionReasonParams, HikeError, QCRejectionReason } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useCreateQCRejectionReason = (
  options?: UseMutationOptions<QCRejectionReason, HikeError<null>, CreateQCRejectionReasonParams>
) =>
  useMutation({
    mutationKey: ['createQCRejectionReason'],
    mutationFn: async (params) => await createQCRejectionReason(params),
    ...options
  });

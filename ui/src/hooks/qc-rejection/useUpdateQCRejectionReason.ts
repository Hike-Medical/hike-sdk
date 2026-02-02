import { updateQCRejectionReason } from '@hike/services';
import type { HikeError, QCRejectionReason, UpdateQCRejectionReasonParams } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useUpdateQCRejectionReason = (
  options?: UseMutationOptions<QCRejectionReason, HikeError<null>, UpdateQCRejectionReasonParams>
) =>
  useMutation({
    mutationKey: ['updateQCRejectionReason'],
    mutationFn: async (params) => await updateQCRejectionReason(params),
    ...options
  });

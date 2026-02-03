import { confirmOrderMoved } from '@hike/services';
import type { ConfirmOrderMovedParams, HikeError, QCRejection } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useConfirmOrderMoved = (
  options?: UseMutationOptions<QCRejection, HikeError<null>, ConfirmOrderMovedParams>
) =>
  useMutation({
    mutationKey: ['confirmOrderMoved'],
    mutationFn: async (params) => await confirmOrderMoved(params),
    ...options
  });

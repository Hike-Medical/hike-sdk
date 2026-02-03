import { markKTComplete } from '@hike/services';
import type { HikeError, MarkKTCompleteParams, QCRejection } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface MarkKTCompleteInput extends MarkKTCompleteParams {
  rejectionId: string;
}

export const useMarkKTComplete = (
  options?: UseMutationOptions<QCRejection, HikeError<null>, MarkKTCompleteInput>
) =>
  useMutation({
    mutationKey: ['markKTComplete'],
    mutationFn: async (params) => await markKTComplete(params),
    ...options
  });

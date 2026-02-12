import { acknowledgeManualReprint } from '@hike/services';
import type { AcknowledgeManualReprintParams, HikeError, QCRejection } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useAcknowledgeManualReprint = (
  options?: UseMutationOptions<QCRejection, HikeError<null>, AcknowledgeManualReprintParams>
) =>
  useMutation({
    mutationKey: ['acknowledgeManualReprint'],
    mutationFn: async (params) => await acknowledgeManualReprint(params),
    ...options
  });

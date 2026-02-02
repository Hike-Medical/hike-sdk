import { sendQCRejectionReprintJob } from '@hike/services';
import type { HikeError, QCRejection, SendReprintJobParams } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useSendQCRejectionReprintJob = (
  options?: UseMutationOptions<QCRejection, HikeError<null>, SendReprintJobParams>
) =>
  useMutation({
    mutationKey: ['sendQCRejectionReprintJob'],
    mutationFn: async (params) => await sendQCRejectionReprintJob(params),
    ...options
  });

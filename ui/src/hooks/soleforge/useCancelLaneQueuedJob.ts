import { cancelLaneQueuedJob } from '@hike/services';
import { CancelLaneQueuedJobParams, CancelLaneQueuedJobResponse, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCancelLaneQueuedJob = (
  options?: UseMutationOptions<CancelLaneQueuedJobResponse, HikeError<null>, CancelLaneQueuedJobParams>
) =>
  useMutation({
    mutationKey: ['cancelLaneQueuedJob'],
    mutationFn: async (params) => await cancelLaneQueuedJob(params),
    ...options
  });

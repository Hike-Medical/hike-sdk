import { queueOrderToLane } from '@hike/services';
import { HikeError, QueueOrderToLaneParams, QueueOrderToLaneResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useQueueOrderToLane = (
  options?: UseMutationOptions<QueueOrderToLaneResponse, HikeError<null>, QueueOrderToLaneParams>
) =>
  useMutation({
    mutationKey: ['queueOrderToLane'],
    mutationFn: async (params) => await queueOrderToLane(params),
    ...options
  });

import { updateLane } from '@hike/services';
import { HikeError, Lane, UpdateLaneParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useUpdateLane = (options?: UseMutationOptions<Lane, HikeError<null>, UpdateLaneParams>) =>
  useMutation({
    mutationKey: ['updateLane'],
    mutationFn: async (params) => await updateLane(params),
    ...options
  });

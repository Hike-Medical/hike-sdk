import { deleteLane } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useDeleteLane = (options?: UseMutationOptions<void, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['deleteLane'],
    mutationFn: async (laneId) => await deleteLane(laneId),
    ...options
  });

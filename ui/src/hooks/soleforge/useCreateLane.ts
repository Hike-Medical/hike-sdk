import { createLane } from '@hike/services';
import { CreateLaneParams, HikeError, Lane } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateLane = (options?: UseMutationOptions<Lane, HikeError<null>, CreateLaneParams>) =>
  useMutation({
    mutationKey: ['createLane'],
    mutationFn: async (params) => await createLane(params),
    ...options
  });

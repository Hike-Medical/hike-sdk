import { startPackingJob } from '@hike/services';
import { HikeError, StartPackingJobBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useStartPackingJob = (options?: UseMutationOptions<void, HikeError<null>, StartPackingJobBody>) =>
  useMutation({
    mutationKey: ['startPackingJob'],
    mutationFn: async (body) => await startPackingJob(body),
    ...options
  });

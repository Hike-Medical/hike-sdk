import { completePackingJob } from '@hike/services';
import { CompletePackingJobBody, CompletePackingJobResponse, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCompletePackingJob = (
  options?: UseMutationOptions<CompletePackingJobResponse, HikeError<null>, CompletePackingJobBody>
) =>
  useMutation({
    mutationKey: ['completePackingJob'],
    mutationFn: async (body) => await completePackingJob(body),
    ...options
  });

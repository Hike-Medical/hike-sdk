import { queuePrintJobs } from '@hike/services';
import { HikeError, PrintJob, QueuePrintJobsParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useQueuePrintJobs = (
  options?: UseMutationOptions<PrintJob | null, HikeError<null>, QueuePrintJobsParams>
) =>
  useMutation({
    mutationKey: ['queuePrintJobs'],
    mutationFn: async (params) => await queuePrintJobs(params),
    ...options
  });

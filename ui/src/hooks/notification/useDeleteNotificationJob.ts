import { deleteNotificationJob } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UseDeleteNotificationJobOptions {
  jobId: string;
}

export const useDeleteNotificationJob = (
  options?: UseMutationOptions<void, HikeError<null>, UseDeleteNotificationJobOptions>
) =>
  useMutation({
    mutationKey: ['deleteNotificationJob'],
    mutationFn: async ({ jobId }) => deleteNotificationJob(jobId),
    ...options
  });

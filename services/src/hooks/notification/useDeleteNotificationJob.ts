import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { deleteNotificationJob } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

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

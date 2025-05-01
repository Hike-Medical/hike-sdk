import { HikeError, deleteNotificationJobs } from '@hike/services';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UseDeleteNotificationJobsOptions {
  notificationId: string;
}

export const useDeleteNotificationJobs = (
  options?: UseMutationOptions<{ count: number }, HikeError<null>, UseDeleteNotificationJobsOptions>
) =>
  useMutation({
    mutationKey: ['deleteNotificationJobs'],
    mutationFn: async ({ notificationId }) => deleteNotificationJobs(notificationId),
    ...options
  });

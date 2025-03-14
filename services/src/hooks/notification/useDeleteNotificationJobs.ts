import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { deleteNotificationJobs } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

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

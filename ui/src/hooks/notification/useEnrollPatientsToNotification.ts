import { HikeError, enrollPatientsToNotification } from '@hike/services';
import { EnrollPatientsParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UseEnrollPatientsToNotificationOptions {
  notificationId: string;
  params: EnrollPatientsParams;
}

export const useEnrollPatientsToNotification = (
  options?: UseMutationOptions<{ jobId?: string }, HikeError<null>, UseEnrollPatientsToNotificationOptions>
) =>
  useMutation({
    mutationKey: ['enrollPatientsToNotification'],
    mutationFn: async ({ notificationId, params }) => await enrollPatientsToNotification(notificationId, params),
    ...options
  });

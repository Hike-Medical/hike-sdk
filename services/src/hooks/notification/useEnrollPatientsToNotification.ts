import { EnrollPatientsParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { enrollPatientsToNotification } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

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

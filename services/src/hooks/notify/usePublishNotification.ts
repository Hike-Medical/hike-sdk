import { Notification } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { publishNotification } from '../../api/notify.service';
import { HikeError } from '../../errors/HikeError';

interface PublishNotificationContext {
  notificationId: string;
}

export const usePublishNotification = (
  options?: UseMutationOptions<Notification, HikeError<null>, PublishNotificationContext>
) => {
  return useMutation({
    mutationKey: ['enrollPatients'],
    mutationFn: async ({ notificationId }: PublishNotificationContext) => await publishNotification(notificationId),
    ...options
  });
};

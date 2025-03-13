import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { clearNotification } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

interface UseClearNotificationOptions {
  notificationId: string;
}

export const useClearNotification = (
  options?: UseMutationOptions<{ count: number }, HikeError<null>, UseClearNotificationOptions>
) =>
  useMutation({
    mutationKey: ['clearNotification'],
    mutationFn: async ({ notificationId }) => clearNotification(notificationId),
    ...options
  });

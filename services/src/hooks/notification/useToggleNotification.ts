import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { activateNotification, deactivateNotification } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

interface UseToggleNotificationOptions {
  notificationId: string;
  active: boolean;
}

export const useToggleNotification = (
  options?: UseMutationOptions<void, HikeError<null>, UseToggleNotificationOptions>
) =>
  useMutation({
    mutationKey: ['toggleNotification'],
    mutationFn: async ({ notificationId, active }) =>
      active ? await activateNotification(notificationId) : await deactivateNotification(notificationId),
    ...options
  });

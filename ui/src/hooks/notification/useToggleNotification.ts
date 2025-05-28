import { activateNotification, deactivateNotification } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

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

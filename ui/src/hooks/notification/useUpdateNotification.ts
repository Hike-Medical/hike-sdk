import { updateNotification } from '@hike/services';
import { CreateNotificationParams, HikeError, Notification } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UseUpdateNotificationOptions {
  id: string;
  params: Partial<CreateNotificationParams>;
}

export const useUpdateNotification = (
  options?: UseMutationOptions<Notification, HikeError<null>, UseUpdateNotificationOptions>
) =>
  useMutation({
    mutationKey: ['updateNotification'],
    mutationFn: async ({ id, params }) => await updateNotification(id, params),
    ...options
  });

export default useUpdateNotification;

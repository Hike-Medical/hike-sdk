import { updateNotificationMessage } from '@hike/services';
import { HikeError, NotificationMessage, UpdateNotificationMessageParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UseUpdateNotificationMessageOptions {
  messageId: string;
  params: UpdateNotificationMessageParams;
}

export const useUpdateNotificationMessage = (
  options?: UseMutationOptions<NotificationMessage, HikeError<null>, UseUpdateNotificationMessageOptions>
) =>
  useMutation({
    mutationKey: ['updateNotificationMessage'],
    mutationFn: async ({ messageId, params }) => await updateNotificationMessage(messageId, params),
    ...options
  });

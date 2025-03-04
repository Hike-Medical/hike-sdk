import { NotificationMessage, UpdateNotificationMessageParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateNotificationMessage } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

interface UseUpdateNotificationMessageOptions {
  messageId: string;
  params: UpdateNotificationMessageParams;
}

export const useUpdateNotificationMessage = (
  options?: UseMutationOptions<NotificationMessage, HikeError<null>, UseUpdateNotificationMessageOptions>
) => {
  return useMutation({
    mutationKey: ['updateNotificationMessage'],
    mutationFn: async ({ messageId, params }: UseUpdateNotificationMessageOptions) =>
      await updateNotificationMessage(messageId, params),
    ...options
  });
};

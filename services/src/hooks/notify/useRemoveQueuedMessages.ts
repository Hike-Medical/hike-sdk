import { NotificationHistory } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { removeQueuedMessages } from '../../api/notify.service';
import { HikeError } from '../../errors/HikeError';

interface RemoveQueuesMessagesContext {
  notificationId: string;
}

export const useRemoveQueuedMessages = (
  options?: UseMutationOptions<NotificationHistory[], HikeError<null>, RemoveQueuesMessagesContext>
) => {
  return useMutation({
    mutationKey: ['removeQueuedMessages'],
    mutationFn: async ({ notificationId }: RemoveQueuesMessagesContext) => await removeQueuedMessages(notificationId),
    ...options
  });
};

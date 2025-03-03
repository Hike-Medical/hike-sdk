import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { deleteNotificationMessage } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

interface UseDeleteNotificationMessageOptions {
  messageId: string;
}

export const useDeleteNotificationMessage = (
  options?: UseMutationOptions<void, HikeError<null>, UseDeleteNotificationMessageOptions>
) =>
  useMutation({
    mutationKey: ['deleteNotificationMessage'],
    mutationFn: async ({ messageId }) => deleteNotificationMessage(messageId),
    ...options
  });

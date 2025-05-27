import { deleteNotificationMessage } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

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

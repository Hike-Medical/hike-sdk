import { CreateNotificationMessageParams, NotificationMessage } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createNotificationMessage } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

interface UseCreateNotificationMessageOptions {
  params: CreateNotificationMessageParams;
}

export const useCreateNotificationMessage = (
  options?: UseMutationOptions<NotificationMessage, HikeError<null>, UseCreateNotificationMessageOptions>
) =>
  useMutation({
    mutationKey: ['createNotificationMessage'],
    mutationFn: async ({ params }) => await createNotificationMessage(params),
    ...options
  });

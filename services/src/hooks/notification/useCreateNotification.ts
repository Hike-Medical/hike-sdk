import { CreateNotificationParams, Notification } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createNotification } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

interface UseCreateNotificationOptions {
  params: CreateNotificationParams;
}

export const useCreateNotification = (
  options?: UseMutationOptions<Notification, HikeError<null>, UseCreateNotificationOptions>
) =>
  useMutation({
    mutationKey: ['createNotification'],
    mutationFn: async ({ params }) => await createNotification(params),
    ...options
  });

import { HikeError, createNotification } from '@hike/services';
import { CreateNotificationParams, Notification } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

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

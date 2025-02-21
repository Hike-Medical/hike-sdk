import { CreateNotificationParams, Notification } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createNotification } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

interface CreateNotificationContext {
  params: CreateNotificationParams;
}

export const useCreateNotification = (
  options?: UseMutationOptions<Notification, HikeError<null>, CreateNotificationContext>
) => {
  return useMutation({
    mutationKey: ['createNotification'],
    mutationFn: async ({ params }: CreateNotificationContext) => await createNotification(params),
    ...options
  });
};

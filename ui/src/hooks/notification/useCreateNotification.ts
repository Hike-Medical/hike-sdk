import { createNotification } from '@hike/services';
import { CreateNotificationParams, HikeError, Notification } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateNotification = (
  options?: UseMutationOptions<Notification, HikeError<null>, CreateNotificationParams>
) =>
  useMutation({
    mutationKey: ['createNotification'],
    mutationFn: async (params) => await createNotification(params),
    ...options
  });

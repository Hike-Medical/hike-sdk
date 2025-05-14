import { HikeError, createNotificationMessage } from '@hike/services';
import { CreateNotificationMessageParams, NotificationMessage } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreateNotificationMessage = (
  options?: UseMutationOptions<NotificationMessage, HikeError<null>, CreateNotificationMessageParams>
) =>
  useMutation({
    mutationKey: ['createNotificationMessage'],
    mutationFn: async (params) => await createNotificationMessage(params),
    ...options
  });

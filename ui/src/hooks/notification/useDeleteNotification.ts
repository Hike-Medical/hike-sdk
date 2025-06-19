import { deleteNotification } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useDeleteNotification = (options?: UseMutationOptions<void, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['deleteNotification'],
    mutationFn: async (notificationId) => deleteNotification(notificationId),
    ...options
  });

export default useDeleteNotification;

import { HikeError, deletePin } from '@hike/services';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useDeletePin = (options?: UseMutationOptions<void, HikeError<null>, void, unknown>) =>
  useMutation({
    mutationKey: ['deletePin'],
    mutationFn: async () => await deletePin(),
    ...options
  });

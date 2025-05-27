import { deletePin } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useDeletePin = (options?: UseMutationOptions<void, HikeError<null>>) =>
  useMutation({
    mutationKey: ['deletePin'],
    mutationFn: async () => await deletePin(),
    ...options
  });

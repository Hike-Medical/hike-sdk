import { updateUser } from '@hike/services';
import { HikeError, SafeUser, UpdateUserParams } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useUpdateUser = (options?: UseMutationOptions<SafeUser, HikeError<null>, UpdateUserParams>) =>
  useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async (params) => await updateUser(params),
    ...options
  });

import { HikeError, updateUser } from '@hike/services';
import { SafeUser, UpdateUserParams } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useUpdateUser = (mutationOptions?: UseMutationOptions<SafeUser, HikeError<null>, UpdateUserParams>) =>
  useMutation({
    mutationKey: ['updateUser'],
    mutationFn: async (params) => await updateUser(params),
    ...mutationOptions
  });

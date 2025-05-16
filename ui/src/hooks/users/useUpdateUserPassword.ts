import { HikeError, updateUserPassword } from '@hike/services';
import { SafeUser, UpdateUserPasswordParams } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useUpdateUserPassword = (
  mutationOptions?: UseMutationOptions<SafeUser, HikeError<null>, UpdateUserPasswordParams>
) =>
  useMutation({
    mutationKey: ['updateUserPassword'],
    mutationFn: async (params) => await updateUserPassword(params),
    ...mutationOptions
  });

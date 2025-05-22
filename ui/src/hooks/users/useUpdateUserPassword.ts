import { updateUserPassword } from '@hike/services';
import { HikeError, UpdateUserPasswordParams } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useUpdateUserPassword = (
  mutationOptions?: UseMutationOptions<void, HikeError<null>, UpdateUserPasswordParams>
) =>
  useMutation({
    mutationKey: ['updateUserPassword'],
    mutationFn: async (params) => await updateUserPassword(params),
    ...mutationOptions
  });

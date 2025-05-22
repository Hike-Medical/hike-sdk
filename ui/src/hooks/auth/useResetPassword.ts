import { resetPassword } from '@hike/services';
import { HikeError, PasswordResetParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useResetPassword = (mutationOptions?: UseMutationOptions<void, HikeError<null>, PasswordResetParams>) =>
  useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: async (credentials) => await resetPassword(credentials),
    ...mutationOptions
  });

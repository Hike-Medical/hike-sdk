import { HikeError, resetPassword } from '@hike/services';
import { PasswordResetParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useResetPassword = (mutationOptions?: UseMutationOptions<void, HikeError<null>, PasswordResetParams>) =>
  useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: async (credentials) => await resetPassword(credentials),
    ...mutationOptions
  });

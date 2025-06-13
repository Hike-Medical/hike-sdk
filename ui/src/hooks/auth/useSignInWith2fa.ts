import { signInWith2fa } from '@hike/services';
import { AuthSession, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useSignInWith2fa = (options?: UseMutationOptions<AuthSession, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['signInWith2fa'],
    mutationFn: async (code) => await signInWith2fa(code),
    ...options
  });

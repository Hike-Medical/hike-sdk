import { signInWithToken } from '@hike/services';
import { AuthSession, HikeError, SignInWithTokenParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useSignInWithToken = (options?: UseMutationOptions<AuthSession, HikeError<null>, SignInWithTokenParams>) =>
  useMutation({
    mutationKey: ['signInWithToken'],
    mutationFn: async (credentials) => await signInWithToken(credentials),
    ...options
  });

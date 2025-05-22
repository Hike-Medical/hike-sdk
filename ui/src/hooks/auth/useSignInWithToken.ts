import { signInWithToken } from '@hike/services';
import { AuthSession, HikeError, SignInWithTokenParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useSignInWithToken = (
  mutationOptions?: UseMutationOptions<AuthSession, HikeError<null>, SignInWithTokenParams>
) =>
  useMutation({
    mutationKey: ['signInWithToken'],
    mutationFn: async (credentials) => await signInWithToken(credentials),
    ...mutationOptions
  });

import { signIn } from '@hike/services';
import { AuthSession, HikeError, SignInParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useSignIn = (options?: UseMutationOptions<AuthSession | null, HikeError<null>, SignInParams>) =>
  useMutation({
    mutationKey: ['signIn'],
    mutationFn: async (params) => await signIn(params),
    ...options
  });

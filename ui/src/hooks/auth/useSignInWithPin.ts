import { signInWithPin } from '@hike/services';
import { AuthSession, HikeError, SignInWithPinBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useSignInWithPin = (options?: UseMutationOptions<AuthSession, HikeError<null>, SignInWithPinBody>) =>
  useMutation({
    mutationKey: ['signInWithPin'],
    mutationFn: async (credentials) => await signInWithPin(credentials),
    ...options
  });

import { signInWithPin } from '@hike/services';
import { HikeError, SignInWithPinBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useSignInWithPin = (
  options?: UseMutationOptions<{ accessToken: string }, HikeError<null>, SignInWithPinBody>
) =>
  useMutation({
    mutationKey: ['signInWithPin'],
    mutationFn: async (credentials) => await signInWithPin(credentials),
    ...options
  });

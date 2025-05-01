import { HikeError, signInWithPin } from '@hike/services';
import { AuthSession, SignInWithPinBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useSignInWithPin = (
  mutationOptions?: UseMutationOptions<AuthSession, HikeError<null>, SignInWithPinBody>
) =>
  useMutation({
    mutationKey: ['signInWithPin'],
    mutationFn: async (credentials) => await signInWithPin(credentials),
    ...mutationOptions
  });

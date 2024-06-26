import { AuthSession, SignInWithPinBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { signInWithPin } from '../../auth/signInWithPin';

export const useSignInWithPin = (mutationOptions?: UseMutationOptions<AuthSession, Error, SignInWithPinBody>) => {
  return useMutation({
    mutationKey: ['signInWithPin'],
    mutationFn: async (credentials: SignInWithPinBody) => await signInWithPin(credentials),
    ...mutationOptions
  });
};

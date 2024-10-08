import { AuthSession, SignInWithPinBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { signInWithPin } from '../../auth/signInWithPin';
import { HikeError } from '../../errors/HikeError';

export const useSignInWithPin = (
  mutationOptions?: UseMutationOptions<AuthSession, HikeError<null>, SignInWithPinBody>
) => {
  return useMutation({
    mutationKey: ['signInWithPin'],
    mutationFn: async (credentials: SignInWithPinBody) => await signInWithPin(credentials),
    ...mutationOptions
  });
};

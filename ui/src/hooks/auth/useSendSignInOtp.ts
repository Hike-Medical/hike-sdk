import { HikeError, sendSignInOtp } from '@hike/services';
import { AuthSession, SendOtpParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useSendSignInOtp = (mutationOptions?: UseMutationOptions<AuthSession, HikeError<null>, SendOtpParams>) =>
  useMutation({
    mutationKey: ['sendSignInOtp'],
    mutationFn: async (credentials) => await sendSignInOtp(credentials),
    ...mutationOptions
  });

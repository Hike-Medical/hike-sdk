import { sendSignInOtp } from '@hike/services';
import { AuthSession, HikeError, SendOtpParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useSendSignInOtp = (options?: UseMutationOptions<AuthSession, HikeError<null>, SendOtpParams>) =>
  useMutation({
    mutationKey: ['sendSignInOtp'],
    mutationFn: async (credentials) => await sendSignInOtp(credentials),
    ...options
  });

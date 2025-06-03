import { sendOtp } from '@hike/services';
import { HikeError, SendOtpParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useSendOtp = (options?: UseMutationOptions<void, HikeError<null>, SendOtpParams>) =>
  useMutation({
    mutationKey: ['sendOtp'],
    mutationFn: async (credentials) => await sendOtp(credentials),
    ...options
  });

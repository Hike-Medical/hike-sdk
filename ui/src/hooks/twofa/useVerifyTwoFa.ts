import { verifyTwoFa } from '@hike/services';
import { HikeError, TwoFaVerifyParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useVerifyTwoFa = (options?: UseMutationOptions<{ valid: boolean }, HikeError<null>, TwoFaVerifyParams>) =>
  useMutation({
    mutationKey: ['verifyTwoFa'],
    mutationFn: async (params) => await verifyTwoFa(params),
    ...options
  });

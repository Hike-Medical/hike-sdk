import { verifyTwoFa } from '@hike/services';
import { HikeError, VerifyTwoFaBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useVerifyTwoFa = (
  options?: UseMutationOptions<{ valid: boolean }, HikeError<null>, VerifyTwoFaBody>
) =>
  useMutation({
    mutationKey: ['verifyTwoFa'],
    mutationFn: async (body) => await verifyTwoFa(body),
    ...options
  });

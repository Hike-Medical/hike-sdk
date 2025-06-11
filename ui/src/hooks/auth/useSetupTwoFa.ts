import { setupTwoFa } from '@hike/services';
import { HikeError, TwoFaSetupResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useSetupTwoFa = (
  options?: UseMutationOptions<TwoFaSetupResponse, HikeError<null>, void>
) =>
  useMutation({
    mutationKey: ['setupTwoFa'],
    mutationFn: async () => await setupTwoFa(),
    ...options
  });

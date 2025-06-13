import { toggleTwoFa } from '@hike/services';
import { HikeError, TwoFaToggleParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useToggleTwoFa = (options?: UseMutationOptions<void, HikeError<null>, TwoFaToggleParams>) =>
  useMutation({
    mutationKey: ['toggleTwoFa'],
    mutationFn: async (params) => await toggleTwoFa(params),
    ...options
  });

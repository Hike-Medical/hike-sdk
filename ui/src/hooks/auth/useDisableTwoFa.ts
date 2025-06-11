import { disableTwoFa } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useDisableTwoFa = (
  options?: UseMutationOptions<void, HikeError<null>, void>
) =>
  useMutation({
    mutationKey: ['disableTwoFa'],
    mutationFn: async () => await disableTwoFa(),
    ...options
  });

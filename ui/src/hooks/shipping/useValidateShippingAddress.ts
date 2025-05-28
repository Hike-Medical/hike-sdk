import { validateAddress } from '@hike/services';
import { HikeError, ValidateAddressBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useValidateShippignAddress = (
  options?: UseMutationOptions<boolean, HikeError<null>, ValidateAddressBody>
) =>
  useMutation({
    mutationKey: ['validateAddress'],
    mutationFn: async (body) => await validateAddress(body),
    ...options
  });

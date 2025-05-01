import { HikeError, validateAddress } from '@hike/services';
import { ValidateAddressBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useValidateShippignAddress = (
  mutationOptions?: UseMutationOptions<boolean, HikeError<null>, ValidateAddressBody>
) =>
  useMutation({
    mutationKey: ['validateAddress'],
    mutationFn: async (body) => await validateAddress(body),
    ...mutationOptions
  });

import { ValidateAddressBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { validateAddress } from '../../api/shipping.service';
import { HikeError } from '../../errors/HikeError';

export const useValidateShippignAddress = (
  mutationOptions?: UseMutationOptions<boolean, HikeError<null>, ValidateAddressBody>
) =>
  useMutation({
    mutationKey: ['validateAddress'],
    mutationFn: async (body: ValidateAddressBody) => await validateAddress(body),
    ...mutationOptions
  });

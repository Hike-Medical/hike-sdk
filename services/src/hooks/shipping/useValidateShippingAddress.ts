import { ValidateAddressBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { validateAddress } from '../../api/shipping.service';

export const useValidateShippignAddress = (
  mutationOptions?: UseMutationOptions<boolean, Error, ValidateAddressBody>
) => {
  return useMutation({
    mutationKey: ['validateAddress'],
    mutationFn: async (body: ValidateAddressBody) => await validateAddress(body),
    ...mutationOptions
  });
};

import { ValidateAddressBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { validateAddress } from '../../api/shipping.service';
import { ResponseError } from '../../errors/ResponseError';

export const useValidateShippignAddress = (
  mutationOptions?: UseMutationOptions<boolean, ResponseError<null>, ValidateAddressBody>
) =>
  useMutation({
    mutationKey: ['validateAddress'],
    mutationFn: async (body: ValidateAddressBody) => await validateAddress(body),
    ...mutationOptions
  });

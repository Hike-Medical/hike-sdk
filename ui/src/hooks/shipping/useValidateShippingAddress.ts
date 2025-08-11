import { validateAddress } from '@hike/services';
import { HikeError, ShipEngineValidateAddressResponse, ValidateAddressBody } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useValidateShippignAddress = (
  options?: UseMutationOptions<ShipEngineValidateAddressResponse[], HikeError<null>, ValidateAddressBody>
) =>
  useMutation({
    mutationKey: ['validateAddress'],
    mutationFn: async (body) => await validateAddress(body),
    ...options
  });

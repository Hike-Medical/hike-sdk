import { setOrderDestinationFacility } from '@hike/services';
import { HikeError, OrderExtended, SetOrderDestinationFacilityParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface SetOrderDestinationFacilityContext {
  orderId: string;
  body: SetOrderDestinationFacilityParams;
  companyIds?: string[];
}

export const useSetOrderDestinationFacility = (
  options?: UseMutationOptions<OrderExtended, HikeError<OrderExtended>, SetOrderDestinationFacilityContext>
) =>
  useMutation({
    mutationKey: ['setOrderDestinationFacility'],
    mutationFn: async ({ orderId, body, companyIds }) => await setOrderDestinationFacility(orderId, body, companyIds),
    ...options
  });

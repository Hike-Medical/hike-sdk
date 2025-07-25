import { getPackingSlip } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useGetPackingSlip = (options?: UseMutationOptions<string, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['packingSlip'],
    mutationFn: async (shipmentId) => await getPackingSlip(shipmentId),
    ...options
  });

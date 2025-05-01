import { HikeError, getPackingSlip } from '@hike/services';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useGetPackingSlip = (mutationOptions?: UseMutationOptions<string, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['packingSlip'],
    mutationFn: async (shipmentId) => await getPackingSlip(shipmentId),
    ...mutationOptions
  });

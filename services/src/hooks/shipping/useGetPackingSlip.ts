import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { getPackingSlip } from '../../api/shipping.service';
import { HikeError } from '../../errors/HikeError';

export const useGetPackingSlip = (mutationOptions?: UseMutationOptions<string, HikeError<null>, string>) => {
  return useMutation({
    mutationKey: ['packingSlip'],
    mutationFn: async (shipmentId: string) => await getPackingSlip(shipmentId),
    ...mutationOptions
  });
};

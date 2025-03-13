import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { getPackingSlip } from '../../api/shipping.service';
import { HikeError } from '../../errors/HikeError';

export const useGetPackingSlip = (mutationOptions?: UseMutationOptions<string, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['packingSlip'],
    mutationFn: async (shipmentId) => await getPackingSlip(shipmentId),
    ...mutationOptions
  });

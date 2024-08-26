import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { getPackingSlip } from '../../api/shipping.service';
import { ResponseError } from '../../errors/ResponseError';

export const useGetPackingSlip = (mutationOptions?: UseMutationOptions<string, ResponseError<null>, string>) => {
  return useMutation({
    mutationKey: ['packingSlip'],
    mutationFn: async (shipmentId: string) => await getPackingSlip(shipmentId),
    ...mutationOptions
  });
};

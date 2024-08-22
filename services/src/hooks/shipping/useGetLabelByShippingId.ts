import { LabelsResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { fetchLabelByShippingId } from '../../api/shipping.service';
import { ResponseError } from '../../errors/ResponseError';

export const useGetLabelByShippingId = (
  mutationOptions?: UseMutationOptions<LabelsResponse, ResponseError<null>, string>
) => {
  return useMutation({
    mutationKey: ['getLabelByShippingId'],
    mutationFn: async (shippingId: string) => await fetchLabelByShippingId(shippingId),
    ...mutationOptions
  });
};

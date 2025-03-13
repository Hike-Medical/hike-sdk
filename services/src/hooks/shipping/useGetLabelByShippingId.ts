import { LabelsResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { fetchLabelByShippingId } from '../../api/shipping.service';
import { HikeError } from '../../errors/HikeError';

export const useGetLabelByShippingId = (
  mutationOptions?: UseMutationOptions<LabelsResponse, HikeError<null>, string>
) =>
  useMutation({
    mutationKey: ['getLabelByShippingId'],
    mutationFn: async (shippingId) => await fetchLabelByShippingId(shippingId),
    ...mutationOptions
  });

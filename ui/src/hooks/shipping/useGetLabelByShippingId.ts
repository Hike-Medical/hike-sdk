import { HikeError, fetchLabelByShippingId } from '@hike/services';
import { LabelsResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useGetLabelByShippingId = (
  mutationOptions?: UseMutationOptions<LabelsResponse, HikeError<null>, string>
) =>
  useMutation({
    mutationKey: ['getLabelByShippingId'],
    mutationFn: async (shippingId) => await fetchLabelByShippingId(shippingId),
    ...mutationOptions
  });

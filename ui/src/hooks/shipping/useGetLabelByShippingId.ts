import { fetchLabelByShippingId } from '@hike/services';
import { HikeError, LabelsResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useGetLabelByShippingId = (options?: UseMutationOptions<LabelsResponse, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['getLabelByShippingId'],
    mutationFn: async (shippingId) => await fetchLabelByShippingId(shippingId),
    ...options
  });

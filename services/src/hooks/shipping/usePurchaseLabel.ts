import { GetLabelsResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { purchaseLabelByRateId } from '../../api/shipping.service';
import { ResponseError } from '../../errors/ResponseError';

export const usePurchaseLabel = (
  mutationOptions?: UseMutationOptions<GetLabelsResponse, ResponseError<null>, string>
) => {
  return useMutation({
    mutationKey: ['purchaseLabel'],
    mutationFn: async (rateId: string) => await purchaseLabelByRateId(rateId),
    ...mutationOptions
  });
};

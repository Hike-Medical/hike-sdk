import { GetLabelsResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { purchaseLabelByRateId } from '../api/shipping.service';

export const usePurchaseLabel = (mutationOptions?: UseMutationOptions<GetLabelsResponse, Error, string>) => {
  return useMutation({
    mutationKey: ['purchaseLabel'],
    mutationFn: async (rateId: string) => await purchaseLabelByRateId(rateId),
    ...mutationOptions
  });
};

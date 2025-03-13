import { GetLabelsResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { purchaseLabelByRateId } from '../../api/shipping.service';
import { HikeError } from '../../errors/HikeError';

export const usePurchaseLabel = (mutationOptions?: UseMutationOptions<GetLabelsResponse, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['purchaseLabel'],
    mutationFn: async (rateId) => await purchaseLabelByRateId(rateId),
    ...mutationOptions
  });

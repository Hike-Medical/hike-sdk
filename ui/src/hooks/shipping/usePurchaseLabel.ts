import { HikeError, purchaseLabelByRateId } from '@hike/services';
import { GetLabelsResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface PurchaseLabelProps {
  rateId: string;
  addressId?: string;
}

export const usePurchaseLabel = (
  mutationOptions?: UseMutationOptions<GetLabelsResponse, HikeError<null>, PurchaseLabelProps>
) =>
  useMutation({
    mutationKey: ['purchaseLabel'],
    mutationFn: async ({ rateId, addressId }: PurchaseLabelProps) => await purchaseLabelByRateId(rateId, addressId),
    ...mutationOptions
  });

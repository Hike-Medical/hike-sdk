import { CheckoutSessionInfo, HikeError } from '@hike/sdk';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { generateCheckoutSessionInfo } from '../api/billing.service';

interface UseGenerateCheckoutSessionInfoOptions
  extends Omit<UseQueryOptions<CheckoutSessionInfo, HikeError<null>>, 'queryKey' | 'queryFn'> {
  workbenchId: string;
  couponCode?: string;
  queryKey?: QueryKey;
}

export const useGenerateCheckoutSessionInfo = ({
  queryKey = [],
  workbenchId,
  couponCode,
  ...options
}: UseGenerateCheckoutSessionInfoOptions) =>
  useQuery({
    queryKey: ['generateCheckoutSessionInfo', workbenchId, couponCode, queryKey],
    queryFn: async () => await generateCheckoutSessionInfo(workbenchId, couponCode),
    staleTime: couponCode ? 0 : 15 * 60 * 1000, // No stale time when coupon is being validated
    ...options
  });

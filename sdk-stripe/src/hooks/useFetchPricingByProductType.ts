import type { HikeError, StripeProduct, StripeProductType } from '@hike/sdk';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchPricingByProductType } from '../api/billing.service';

interface UseFetchPricingByProductTypeContext
  extends Omit<UseQueryOptions<StripeProduct | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  stripeProductType: StripeProductType;
  queryKey?: QueryKey;
}

export const useFetchPricingByProductType = ({
  stripeProductType,
  queryKey = [],
  ...options
}: UseFetchPricingByProductTypeContext) =>
  useQuery({
    queryKey: ['stripePricingByProductType', queryKey, stripeProductType],
    queryFn: async () => await fetchPricingByProductType(stripeProductType),
    ...options
  });

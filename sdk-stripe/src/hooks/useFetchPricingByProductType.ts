import type { HikeError, StripeProduct, StripeProductType } from '@hike/sdk';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchPricingByProductType } from '../api/billing.service';

interface UseFetchPricingByProductTypeContext
  extends Omit<UseQueryOptions<StripeProduct, HikeError<null>>, 'queryKey' | 'queryFn'> {
  enabled: boolean;
  queryKey?: QueryKey;
  stripeProductType: StripeProductType;
}

export const useFetchPricingByProductType = ({
  queryKey = [],
  enabled = true,
  stripeProductType,
  ...options
}: UseFetchPricingByProductTypeContext) =>
  useQuery({
    queryKey: ['stripePricingByProductType', queryKey],
    queryFn: async () => await fetchPricingByProductType(stripeProductType),
    enabled,
    ...options
  });

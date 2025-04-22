import { HikeError } from '@hike/services';
import type { StripeProduct, StripeProductType } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchPricingByProductType } from '../billing.service';

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

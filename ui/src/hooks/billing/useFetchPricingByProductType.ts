import { fetchPricingByProductType } from '@hike/services';
import type { HikeError, StripeProduct, StripeProductType } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseFetchPricingByProductTypeContext
  extends Omit<UseQueryOptions<StripeProduct | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  stripeProductType: StripeProductType;
  queryKey?: QueryKey;
}

/**
 * React Query hook to fetch pricing information for a specific Stripe product type
 * @param stripeProductType - The type of Stripe product to fetch pricing for
 * @param options - Additional React Query options
 * @returns Query result with Stripe product pricing information
 */
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

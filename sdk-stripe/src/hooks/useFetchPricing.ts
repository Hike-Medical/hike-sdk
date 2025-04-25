import type { HikeError, StripeEntity, StripeProduct } from '@hike/sdk';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchPricing } from '../api/billing.service';

interface UseFetchPricingContext
  extends Omit<
    UseQueryOptions<{ tier: StripeEntity; products: StripeProduct[] }[], HikeError<null>>,
    'queryKey' | 'queryFn'
  > {
  enabled: boolean;
  queryKey?: QueryKey;
}

export const useFetchPricing = ({ queryKey = [], enabled = true, ...options }: UseFetchPricingContext) =>
  useQuery({
    queryKey: ['stripePricing', queryKey],
    queryFn: async () => await fetchPricing(),
    enabled,
    ...options
  });

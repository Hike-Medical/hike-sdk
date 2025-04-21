import { HikeError } from '@hike/services';
import type { StripeEntity, StripeProduct } from '@prisma/client';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchPricing } from '../billing.service';

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

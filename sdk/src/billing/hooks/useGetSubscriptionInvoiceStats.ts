import { HikeError } from '@hike/services';
import type { BillingSubscriptionStats } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getStripeSubscriptionStats } from '../billing.service';

export interface useGetStripeSubscriptionInvoice
  extends Omit<UseQueryOptions<BillingSubscriptionStats[] | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  stripeEntityId: string;
  enabled: boolean;
  queryKey?: QueryKey;
}

export const useGetStripeSubscriptionStats = ({
  queryKey = [],
  stripeEntityId,
  enabled = true,
  ...options
}: useGetStripeSubscriptionInvoice) =>
  useQuery({
    queryKey: ['stripeSubscriptionStats', queryKey],
    queryFn: async () => await getStripeSubscriptionStats(stripeEntityId),
    enabled,
    ...options
  });

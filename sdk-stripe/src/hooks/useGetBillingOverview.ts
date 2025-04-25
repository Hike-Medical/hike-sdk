import type { BillingOverview, HikeError } from '@hike/sdk';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getBillingOverview } from '../api/billing.service';

interface UseGetBillingOverviewContext
  extends Omit<UseQueryOptions<BillingOverview, HikeError<null>>, 'queryKey' | 'queryFn'> {
  stripeEntityId: string;
  enabled: boolean;
  queryKey?: QueryKey;
}

export const useGetBillingOverview = ({
  queryKey = [],
  stripeEntityId,
  enabled = true,
  ...options
}: UseGetBillingOverviewContext) =>
  useQuery({
    queryKey: ['stripeBillingOverview', queryKey],
    queryFn: async () => await getBillingOverview(stripeEntityId),
    enabled,
    ...options
  });

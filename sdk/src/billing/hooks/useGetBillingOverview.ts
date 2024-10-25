import { HikeError } from '@hike/services';
import type { BillingOverview } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getBillingOverview } from '../billing.service';

export interface useGetBillingOverviewContext
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
}: useGetBillingOverviewContext) =>
  useQuery({
    queryKey: ['stripeBillingOverview', queryKey],
    queryFn: async () => await getBillingOverview(stripeEntityId),
    enabled,
    ...options
  });

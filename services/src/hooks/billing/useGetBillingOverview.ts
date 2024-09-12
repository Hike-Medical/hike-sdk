import type { BillingOverview } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getBillingOverview } from '../../api/billing.service';
import { ResponseError } from '../../errors/ResponseError';

export interface useGetBillingOverviewContext
  extends Omit<UseQueryOptions<BillingOverview, ResponseError<null>>, 'queryKey' | 'queryFn'> {
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

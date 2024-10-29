import { HikeError } from '@hike/services';
import type { UpFrontPaymentInfo } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getUpFrontPaymentInfo } from '../billing.service';

export interface useGetUpFrontPaymentInfoContext
  extends Omit<UseQueryOptions<UpFrontPaymentInfo | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  stripeEntityId: string;
  enabled: boolean;
  queryKey?: QueryKey;
}

export const useGetUpFrontPaymentInfo = ({
  queryKey = [],
  stripeEntityId,
  enabled = true,
  ...options
}: useGetUpFrontPaymentInfoContext) =>
  useQuery({
    queryKey: ['stripeUpFrontPaymentInfo', queryKey],
    queryFn: async () => await getUpFrontPaymentInfo(stripeEntityId),
    enabled,
    ...options
  });

import type { UpFrontPaymentInfo } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getUpFrontPaymentInfo } from '../../api/billing.service';
import { ResponseError } from '../../errors/ResponseError';

export interface useGetUpFrontPaymentInfoContext
  extends Omit<UseQueryOptions<UpFrontPaymentInfo | null, ResponseError<null>>, 'queryKey' | 'queryFn'> {
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

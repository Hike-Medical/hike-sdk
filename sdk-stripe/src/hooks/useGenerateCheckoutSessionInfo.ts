import { CheckoutSessionInfo, HikeError } from '@hike/sdk';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { generateCheckoutSessionInfo } from '../api/billing.service';

interface UseGenerateCheckoutSessionInfoOptions
  extends Omit<UseQueryOptions<CheckoutSessionInfo, HikeError<null>>, 'queryKey' | 'queryFn'> {
  workbenchId: string;
  queryKey?: QueryKey;
}

export const useGenerateCheckoutSessionInfo = ({
  queryKey = [],
  workbenchId,
  ...options
}: UseGenerateCheckoutSessionInfoOptions) =>
  useQuery({
    queryKey: ['generateCheckoutSessionInfo', workbenchId, queryKey],
    queryFn: async () => await generateCheckoutSessionInfo(workbenchId),
    staleTime: 15 * 60 * 1000, // 15 minutes - eligibility unlikely to change during scan flow
    ...options
  });

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
    queryKey: ['generateCheckoutSessionInfo', queryKey],
    queryFn: async () => await generateCheckoutSessionInfo(workbenchId),
    ...options
  });

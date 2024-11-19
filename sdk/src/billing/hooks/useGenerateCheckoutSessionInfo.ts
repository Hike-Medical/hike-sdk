import { HikeError } from '@hike/services';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { generateCheckoutSessionInfo } from '../billing.service';

export interface useGenerateCheckoutSessionInfoOptions
  extends Omit<UseQueryOptions<{ original: number; discounted: number }, HikeError<null>>, 'queryKey' | 'queryFn'> {
  workbenchId: string;
  queryKey?: QueryKey;
}

export const useGenerateCheckoutSessionInfo = ({
  queryKey = [],
  workbenchId,
  ...options
}: useGenerateCheckoutSessionInfoOptions) =>
  useQuery({
    queryKey: ['generateCheckoutSessionInfo', queryKey],
    queryFn: async () => await generateCheckoutSessionInfo(workbenchId),
    ...options
  });

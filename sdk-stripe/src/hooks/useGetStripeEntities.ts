import type { HikeError, StripeEntity } from '@hike/sdk';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getStripeEntities } from '../api/billing.service';

interface UseGetStripeEntitiesOptions
  extends Omit<UseQueryOptions<StripeEntity[] | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useGetStripeEntities = ({ queryKey = [], ...options }: UseGetStripeEntitiesOptions = {}) =>
  useQuery({
    queryKey: ['stripeEntities', queryKey],
    queryFn: async () => await getStripeEntities(),
    ...options
  });

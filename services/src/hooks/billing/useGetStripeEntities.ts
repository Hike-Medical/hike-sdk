import type { StripeEntity } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getStripeEntities } from '../../api/billing.service';
import { HikeError } from '../../errors/HikeError';

export interface useGetStripeEntitiesOptions
  extends Omit<UseQueryOptions<StripeEntity[] | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useGetStripeEntities = ({ queryKey = [], ...options }: useGetStripeEntitiesOptions = {}) =>
  useQuery({
    queryKey: ['stripeEntities', queryKey],
    queryFn: async () => await getStripeEntities(),
    ...options
  });

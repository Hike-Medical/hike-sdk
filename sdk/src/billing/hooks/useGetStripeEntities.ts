import { HikeError } from '@hike/services';
import type { StripeEntity } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getStripeEntities } from '../billing.service';

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

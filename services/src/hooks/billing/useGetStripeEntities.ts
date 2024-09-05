import type { StripeEntity } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getStripeEntities } from '../../api/billing.service';
import { ResponseError } from '../../errors/ResponseError';

export interface useGetStripeEntitiesOptions
  extends Omit<UseQueryOptions<StripeEntity[] | null, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useGetStripeEntities = ({ queryKey = [], ...options }: useGetStripeEntitiesOptions = {}) =>
  useQuery({
    queryKey: ['stripeEntities', queryKey],
    queryFn: async () => await getStripeEntities(),
    ...options
  });

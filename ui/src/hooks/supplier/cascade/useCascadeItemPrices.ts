import { fetchCascadeItemPrices } from '@hike/services';
import type { CascadePriceResponse, GetCascadeItemPricesParams } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseCascadeItemPricesOptions
  extends Omit<UseQueryOptions<CascadePriceResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: GetCascadeItemPricesParams;
  queryKey?: QueryKey;
}

export const useCascadeItemPrices = ({ params, queryKey = [], ...options }: UseCascadeItemPricesOptions) =>
  useQuery({
    queryKey: ['cascadeItemPrices', params, queryKey],
    queryFn: async () => await fetchCascadeItemPrices(params),
    enabled: params.itemIds.length > 0,
    ...options
  });

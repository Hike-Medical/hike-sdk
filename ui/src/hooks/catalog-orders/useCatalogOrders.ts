import { fetchCatalogOrders } from '@hike/services';
import type { CatalogOrderResponse, GetCatalogOrdersParams, HikeError, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseCatalogOrdersOptions
  extends Omit<
    UseQueryOptions<PagedResponse<CatalogOrderResponse[]>, HikeError<null>>,
    'queryKey' | 'queryFn'
  > {
  params?: GetCatalogOrdersParams;
  queryKey?: QueryKey;
}

export const useCatalogOrders = ({ params, queryKey = [], ...options }: UseCatalogOrdersOptions = {}) =>
  useQuery({
    queryKey: ['catalog-orders', params, ...queryKey],
    queryFn: async () => await fetchCatalogOrders(params),
    ...options
  });

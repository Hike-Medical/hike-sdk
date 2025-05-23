import { fetchProducts } from '@hike/services';
import type { CatalogProductExtended, GetProductsParams, PagedResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseCatalogProductsOptions
  extends Omit<UseQueryOptions<PagedResponse<CatalogProductExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetProductsParams;
  queryKey?: QueryKey;
}

export const useCatalogProducts = ({ params, queryKey = [], ...options }: UseCatalogProductsOptions = {}) =>
  useQuery({
    queryKey: ['catalog-products', params, queryKey],
    queryFn: async () => await fetchProducts(params),
    ...options
  });

import type { CatalogProductExtended, GetProductsParams, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../api/catalog.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseCatalogProductsOptions
  extends Omit<UseQueryOptions<PagedResponse<CatalogProductExtended[]>, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetProductsParams;
  queryKey?: QueryKey;
}

export const useCatalogProducts = ({ params, queryKey = [], ...options }: UseCatalogProductsOptions = {}) =>
  useQuery({
    queryKey: ['catalog-products', params, queryKey],
    queryFn: async () => await fetchProducts(params),
    ...options
  });

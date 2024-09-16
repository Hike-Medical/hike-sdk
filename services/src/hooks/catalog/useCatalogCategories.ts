import type { CatalogCategory, GetCategoriesParams, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../../api/catalog.service';
import { HikeError } from '../../errors/HikeError';

export interface UseCatalogCategoriesOptions
  extends Omit<UseQueryOptions<PagedResponse<CatalogCategory[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetCategoriesParams;
  queryKey?: QueryKey;
}

export const useCatalogCategories = ({ params, queryKey = [], ...options }: UseCatalogCategoriesOptions = {}) =>
  useQuery({
    queryKey: ['catalog-categories', params, queryKey],
    queryFn: async () => await fetchCategories(params),
    ...options
  });

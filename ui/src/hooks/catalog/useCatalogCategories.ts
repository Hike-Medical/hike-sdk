import { fetchCategories } from '@hike/services';
import type { CatalogCategory, GetCategoriesParams, PagedResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseCatalogCategoriesOptions
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

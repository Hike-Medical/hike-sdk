import type { CatalogCategory, GetCategoriesParams, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/catalog.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseCategoriesOptions
  extends Omit<UseQueryOptions<PagedResponse<CatalogCategory[]>, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetCategoriesParams;
  queryKey?: QueryKey;
}

export const useCategories = ({ params, queryKey = [], ...options }: UseCategoriesOptions = {}) =>
  useQuery({
    queryKey: ['categories', params, queryKey],
    queryFn: async () => await fetchCategories(params),
    ...options
  });

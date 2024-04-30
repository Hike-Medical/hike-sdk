import type { CatalogCategory, PagedParams, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { fetchCatagories } from '../api/catalog.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseCategoriesOptions extends PagedParams {
  key?: string[];
  enabled?: boolean;
}

export const useCategories = ({ key = [], enabled = true, ...params }: UseCategoriesOptions = {}) =>
  useQuery<PagedResponse<CatalogCategory[]>, ResponseError<null>>({
    queryKey: ['categories', ...key, params],
    queryFn: async () => await fetchCatagories(params),
    enabled
  });

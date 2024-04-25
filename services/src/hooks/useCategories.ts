import type { CatalogCategory, PagedParams, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { fetchCatagories } from '../api/catalog.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseCategoriesOptions extends PagedParams {
  key?: string[];
  enabled?: boolean;
}

export const useCategories = ({ key = [], enabled = true, ...params }: UseCategoriesOptions = {}) =>
  useQuery<PagedResponse<CatalogCategory[]>, ResponseError<null>>({
    queryKey: ['categories', ...key, params],
    queryFn: async () => {
      try {
        return await fetchCatagories(params);
      } catch (error) {
        const status = isAxiosError(error) ? error.status ?? 500 : 500;
        // TODO: Extract message from backend response
        throw new ResponseError<null>('There was an error retrieving categories', status, null);
      }
    },
    enabled
  });

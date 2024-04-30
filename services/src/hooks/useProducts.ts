import type { CatalogProduct, PagedParams, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { fetchCatagoryProducts, fetchProducts, fetchVendorProducts, searchProducts } from '../api/catalog.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseProductsOptions extends PagedParams {
  key?: string[];
  term?: string | null;
  termType?: UseProductTermType;
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  enabled?: boolean;
}

export enum UseProductTermType {
  TEXT,
  CATEGORY,
  VENDOR
}

export const useProducts = ({
  key = [],
  term,
  termType = UseProductTermType.TEXT,
  enabled = true,
  ...params
}: UseProductsOptions = {}) =>
  useQuery<PagedResponse<CatalogProduct[]>, ResponseError<null>>({
    queryKey: ['products', ...key, term, termType, params],
    queryFn: async () => {
      if (!term) {
        return await fetchProducts(params);
      }

      switch (termType) {
        case UseProductTermType.TEXT:
          return await searchProducts({ term, ...params });
        case UseProductTermType.CATEGORY:
          return await fetchCatagoryProducts(term, params);
        case UseProductTermType.VENDOR:
          return await fetchVendorProducts(term, params);
        default:
          return { data: [], total: 0, pageIndex: 0, pageSize: 0 };
      }
    },
    enabled
  });

import type { CatalogVendor, PagedParams, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { fetchVendors } from '../api/catalog.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseVendorsOptions extends PagedParams {
  key?: string[];
  enabled?: boolean;
}

export const useVendors = ({ key = [], enabled = true, ...params }: UseVendorsOptions = {}) =>
  useQuery<PagedResponse<CatalogVendor[]>, ResponseError<null>>({
    queryKey: ['vendors', ...key, params],
    queryFn: async () => await fetchVendors(params),
    enabled
  });

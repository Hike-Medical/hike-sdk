import type { CatalogVendor, PagedParams, PagedResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { fetchVendors } from '../api/catalog.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseVendorsOptions extends PagedParams {
  key?: string[];
  enabled?: boolean;
}

export const useVendors = ({ key = [], enabled = true, ...params }: UseVendorsOptions = {}) =>
  useQuery<PagedResponse<CatalogVendor[]>, ResponseError<null>>({
    queryKey: ['vendors', ...key, params],
    queryFn: async () => {
      try {
        return fetchVendors(params);
      } catch (error) {
        const status = isAxiosError(error) ? error.status ?? 500 : 500;
        // TODO: Extract message from backend response
        throw new ResponseError<null>('There was an error retrieving vendors', status, null);
      }
    },
    enabled
  });

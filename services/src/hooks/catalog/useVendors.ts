import type { CatalogVendor, GetVendorsParams, PagedResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchVendors } from '../../api/catalog.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseVendorsOptions
  extends Omit<UseQueryOptions<PagedResponse<CatalogVendor[]>, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetVendorsParams;
  queryKey?: QueryKey;
}

export const useVendors = ({ params, queryKey = [], ...options }: UseVendorsOptions = {}) =>
  useQuery({
    queryKey: ['vendors', params, queryKey],
    queryFn: async () => await fetchVendors(params),
    ...options
  });

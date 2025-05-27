import { fetchVendors } from '@hike/services';
import type { CatalogVendor, GetVendorsParams, PagedResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseVendorsOptions
  extends Omit<UseQueryOptions<PagedResponse<CatalogVendor[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetVendorsParams;
  queryKey?: QueryKey;
}

export const useVendors = ({ params, queryKey = [], ...options }: UseVendorsOptions = {}) =>
  useQuery({
    queryKey: ['vendors', params, queryKey],
    queryFn: async () => await fetchVendors(params),
    ...options
  });

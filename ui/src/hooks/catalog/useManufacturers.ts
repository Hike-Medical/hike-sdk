import { fetchManufacturers } from '@hike/services';
import type { CatalogManufacturer, GetManufacturersParams, PagedResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseManufacturersOptions
  extends Omit<UseQueryOptions<PagedResponse<CatalogManufacturer[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetManufacturersParams;
  queryKey?: QueryKey;
}

export const useManufacturers = ({ params, queryKey = [], ...options }: UseManufacturersOptions = {}) =>
  useQuery({
    queryKey: ['manufacturers', params, queryKey],
    queryFn: async () => await fetchManufacturers(params),
    ...options
  });

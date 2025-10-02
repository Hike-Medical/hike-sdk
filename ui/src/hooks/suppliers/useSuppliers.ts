import { fetchSuppliers } from '@hike/services';
import type { CatalogSupplier, GetSuppliersParams, PagedResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseSuppliersOptions
  extends Omit<UseQueryOptions<PagedResponse<CatalogSupplier[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetSuppliersParams;
  queryKey?: QueryKey;
}

export const useSuppliers = ({ params, queryKey = [], ...options }: UseSuppliersOptions = {}) =>
  useQuery({
    queryKey: ['suppliers', params, queryKey],
    queryFn: async () => await fetchSuppliers(params),
    ...options
  });

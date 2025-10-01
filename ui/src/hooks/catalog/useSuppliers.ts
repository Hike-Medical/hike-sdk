import { fetchSuppliers } from '@hike/services';
import type { CatalogSupplier, HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseSuppliersOptions
  extends Omit<UseQueryOptions<CatalogSupplier[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useSuppliers = ({ queryKey = [], ...options }: UseSuppliersOptions = {}) =>
  useQuery({
    queryKey: ['suppliers', queryKey],
    queryFn: async () => await fetchSuppliers(),
    ...options
  });

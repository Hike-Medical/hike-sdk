import { fetchCatalogImportStatus } from '@hike/services';
import type { ImportCatalogProductsResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseCatalogImportJobOptions
  extends Omit<UseQueryOptions<{ progress: number; data?: ImportCatalogProductsResponse }, HikeError<null>>, 'queryKey' | 'queryFn'> {
  id: string;
  queryKey?: QueryKey;
}

export const useCatalogImportJob = ({ id, queryKey = [], ...options }: UseCatalogImportJobOptions) =>
  useQuery({
    queryKey: ['catalogImportJob', id, queryKey],
    queryFn: async () => await fetchCatalogImportStatus(id),
    ...options
  });

import { getSoleforgeDashboard } from '@hike/services';
import { FactoryId, HikeError, SoleforgeDashboard } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseSoleforgeDashboardOptions {
  factoryIds?: FactoryId[];
  queryKey?: QueryKey;
  enabled?: boolean;
}

export const useSoleforgeDashboard = (
  options?: UseSoleforgeDashboardOptions &
    Omit<UseQueryOptions<SoleforgeDashboard, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: options?.queryKey ?? ['soleforgeDashboard', options?.factoryIds],
    queryFn: async () => await getSoleforgeDashboard({ factoryIds: options?.factoryIds }),
    ...options
  });

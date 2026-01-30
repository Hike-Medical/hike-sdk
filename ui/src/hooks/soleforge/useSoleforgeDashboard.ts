import { getSoleforgeDashboard } from '@hike/services';
import { FactoryName, HikeError, SoleforgeDashboard } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseSoleforgeDashboardOptions {
  factoryNames?: FactoryName[];
  queryKey?: QueryKey;
  enabled?: boolean;
}

export const useSoleforgeDashboard = (
  options?: UseSoleforgeDashboardOptions &
    Omit<UseQueryOptions<SoleforgeDashboard, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: options?.queryKey ?? ['soleforgeDashboard', options?.factoryNames],
    queryFn: async () => await getSoleforgeDashboard({ factoryNames: options?.factoryNames }),
    ...options
  });

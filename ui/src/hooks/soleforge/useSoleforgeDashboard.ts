import { getSoleforgeDashboard } from '@hike/services';
import { HikeError, SoleforgeDashboard } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseSoleforgeDashboardOptions {
  queryKey?: QueryKey;
  enabled?: boolean;
}

export const useSoleforgeDashboard = (
  options?: UseSoleforgeDashboardOptions &
    Omit<UseQueryOptions<SoleforgeDashboard, HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: options?.queryKey ?? ['soleforgeDashboard'],
    queryFn: async () => await getSoleforgeDashboard(),
    ...options
  });

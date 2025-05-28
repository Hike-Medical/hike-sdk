import { fetchRosterDeactivateStatus } from '@hike/services';
import type { DeactivateRosterResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseRosterDeactivateJobOptions
  extends Omit<
    UseQueryOptions<{ progress: number; data?: DeactivateRosterResponse }, HikeError<null>>,
    'queryKey' | 'queryFn'
  > {
  id: string;
  queryKey?: QueryKey;
}

export const useRosterDeactivateJob = ({ id, queryKey = [], ...options }: UseRosterDeactivateJobOptions) =>
  useQuery({
    queryKey: ['rosterDeactivateJob', id, queryKey],
    queryFn: async () => await fetchRosterDeactivateStatus(id),
    ...options
  });

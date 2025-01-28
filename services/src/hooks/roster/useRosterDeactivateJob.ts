import type { DeactivateRosterResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchRosterDeactivateStatus } from '../../api/roster.service';
import { HikeError } from '../../errors/HikeError';

export interface UseRosterDeactivateJobOptions
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

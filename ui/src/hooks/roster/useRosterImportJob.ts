import { fetchRosterImportStatus } from '@hike/services';
import type { ImportRosterResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseRosterImportJobOptions
  extends Omit<
    UseQueryOptions<{ progress: number; data?: ImportRosterResponse }, HikeError<null>>,
    'queryKey' | 'queryFn'
  > {
  id: string;
  queryKey?: QueryKey;
}

export const useRosterImportJob = ({ id, queryKey = [], ...options }: UseRosterImportJobOptions) =>
  useQuery({
    queryKey: ['rosterImportJob', id, queryKey],
    queryFn: async () => await fetchRosterImportStatus(id),
    ...options
  });

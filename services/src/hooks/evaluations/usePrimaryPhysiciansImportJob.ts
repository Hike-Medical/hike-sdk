import type { ImportPrimaryPhysiciansResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchPrimaryPhysiciansImportStatus } from '../../api/evaluation.service';
import { HikeError } from '../../errors/HikeError';

export interface UsePrimaryPhysiciansImportJobOptions
  extends Omit<
    UseQueryOptions<{ progress: number; data?: ImportPrimaryPhysiciansResponse }, HikeError<null>>,
    'queryKey' | 'queryFn'
  > {
  id: string;
  queryKey?: QueryKey;
}

export const usePrimaryPhysiciansImportJob = ({
  id,
  queryKey = [],
  ...options
}: UsePrimaryPhysiciansImportJobOptions) =>
  useQuery({
    queryKey: ['primaryPhysiciansImportJob', id, queryKey],
    queryFn: async () => await fetchPrimaryPhysiciansImportStatus(id),
    ...options
  });

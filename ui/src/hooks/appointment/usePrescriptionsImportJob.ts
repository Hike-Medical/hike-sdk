import { fetchPrescriptionsImportStatus } from '@hike/services';
import type { ImportPrescriptionsResponse } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UsePrescriptionsImportJobOptions
  extends Omit<
    UseQueryOptions<{ progress: number; data?: ImportPrescriptionsResponse }, HikeError<null>>,
    'queryKey' | 'queryFn'
  > {
  id: string;
  queryKey?: QueryKey;
}

export const usePrescriptionsImportJob = ({ id, queryKey = [], ...options }: UsePrescriptionsImportJobOptions) =>
  useQuery({
    queryKey: ['prescriptionsImportJob', id, queryKey],
    queryFn: async () => await fetchPrescriptionsImportStatus(id),
    ...options
  });

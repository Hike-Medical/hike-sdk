import { WorkbenchStatus } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { statsForWorkbenches } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

export interface UseWorkbenchStatsOptions
  extends Omit<UseQueryOptions<{ status: WorkbenchStatus; count: number }[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useWorkbenchStats = ({ queryKey = [], ...options }: UseWorkbenchStatsOptions = {}) =>
  useQuery({
    queryKey: ['workbenchStats', queryKey],
    queryFn: async () => await statsForWorkbenches(),
    ...options
  });

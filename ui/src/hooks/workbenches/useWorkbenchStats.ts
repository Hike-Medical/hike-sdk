import { HikeError, statsForWorkbenches } from '@hike/services';
import { WorkbenchStatus } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseWorkbenchStatsOptions
  extends Omit<UseQueryOptions<{ status: WorkbenchStatus; count: number }[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  companyIds?: string[];
  queryKey?: QueryKey;
}

export const useWorkbenchStats = ({ companyIds = [], queryKey = [], ...options }: UseWorkbenchStatsOptions = {}) =>
  useQuery({
    queryKey: ['workbenchStats', queryKey],
    queryFn: async () => await statsForWorkbenches(companyIds),
    ...options
  });

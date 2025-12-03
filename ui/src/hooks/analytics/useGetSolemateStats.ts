import { getSolemateStats } from '@hike/services';
import { HikeError, SolemateStatus } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetSolemateStatsOptions
  extends Omit<UseQueryOptions<Record<SolemateStatus, number>, HikeError<null>>, 'queryKey' | 'queryFn'> {}

export const useGetSolemateStats = (companyIds: string[], queryOptions?: UseGetSolemateStatsOptions) =>
  useQuery({
    queryKey: ['solemateStats', companyIds],
    queryFn: async () => await getSolemateStats(companyIds),
    ...queryOptions
  });

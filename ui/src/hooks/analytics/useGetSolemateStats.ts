import { getSolemateStats, HikeError } from '@hike/services';
import { SolemateStatus } from '@hike/utils';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetSolemateStatsOptions
  extends Omit<UseQueryOptions<Record<SolemateStatus, number>, HikeError<null>>, 'queryKey' | 'queryFn'> {}

export const useGetSolemateStats = (companyIds: string[], queryOptions?: UseGetSolemateStatsOptions) =>
  useQuery({
    queryKey: ['solemateStats', companyIds],
    queryFn: async () => await getSolemateStats(companyIds),
    ...queryOptions
  });

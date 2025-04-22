import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getSolemateStats } from '../../api/analytics.service';
import { HikeError } from '../../errors/HikeError';

interface UseGetSolemateStatsOptions
  extends Omit<
    UseQueryOptions<
      {
        devOrFailed: number;
        needsValidation: number;
        needsManufacturing: number;
        inProduction: number;
      },
      HikeError<null>
    >,
    'queryKey' | 'queryFn'
  > {}

export const useGetSolemateStats = (companyIds: string[], queryOptions?: UseGetSolemateStatsOptions) =>
  useQuery({
    queryKey: ['solemateStats', companyIds],
    queryFn: async () => await getSolemateStats(companyIds),
    ...queryOptions
  });

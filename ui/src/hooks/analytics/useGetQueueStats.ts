import { getQueueStats } from '@hike/services';
import { HikeError, QueueStatus } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetQueueStatsOptions
  extends Omit<UseQueryOptions<Record<QueueStatus, number>, HikeError<null>>, 'queryKey' | 'queryFn'> {}

export const useGetQueueStats = (companyIds: string[], queryOptions?: UseGetQueueStatsOptions) =>
  useQuery({
    queryKey: ['queueStats', companyIds],
    queryFn: async () => await getQueueStats(companyIds),
    ...queryOptions
  });

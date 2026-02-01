import { getQueueStats } from '@hike/services';
import { HikeError, QueueStatsResponse } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseGetQueueStatsOptions
  extends Omit<UseQueryOptions<QueueStatsResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {}

export const useGetQueueStats = (queryOptions?: UseGetQueueStatsOptions) =>
  useQuery({
    queryKey: ['queueStats'],
    queryFn: async () => await getQueueStats(),
    ...queryOptions
  });

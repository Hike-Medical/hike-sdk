import { getLaneQueue } from '@hike/services';
import { HikeError, LaneQueueEntry } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseLaneQueueOptions extends Omit<UseQueryOptions<LaneQueueEntry[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  laneId: string;
  queryKey?: QueryKey;
}

export const useLaneQueue = ({ laneId, queryKey = [], ...options }: UseLaneQueueOptions) =>
  useQuery<LaneQueueEntry[], HikeError<null>>({
    queryKey: ['laneQueue', laneId, queryKey],
    queryFn: async () => await getLaneQueue(laneId),
    enabled: !!laneId,
    ...options
  });

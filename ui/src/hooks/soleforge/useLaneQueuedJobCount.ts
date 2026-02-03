import { getLaneQueuedJobCount } from '@hike/services';
import { HikeError, LaneQueuedJobCountResponse } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseLaneQueuedJobCountOptions
  extends Omit<UseQueryOptions<LaneQueuedJobCountResponse, HikeError<null>>, 'queryFn' | 'queryKey'> {
  laneId: string;
  queryKey?: QueryKey;
}

export const useLaneQueuedJobCount = ({ laneId, queryKey = [], ...options }: UseLaneQueuedJobCountOptions) =>
  useQuery<LaneQueuedJobCountResponse, HikeError<null>>({
    queryKey: ['laneQueuedJobCount', laneId, queryKey],
    queryFn: async () => await getLaneQueuedJobCount(laneId),
    enabled: !!laneId,
    ...options
  });

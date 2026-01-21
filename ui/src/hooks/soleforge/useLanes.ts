import { getLanes } from '@hike/services';
import { FactoryId, HikeError, Lane } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseLanesOptions extends Omit<UseQueryOptions<Lane[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  factoryIds?: FactoryId[];
  queryKey?: QueryKey;
}

export const useLanes = ({ factoryIds, queryKey = [], ...options }: UseLanesOptions = {}) =>
  useQuery<Lane[], HikeError<null>>({
    queryKey: ['lanes', factoryIds, queryKey],
    queryFn: async () => await getLanes({ factoryIds }),
    ...options
  });

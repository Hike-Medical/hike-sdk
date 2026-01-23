import { getLanes } from '@hike/services';
import { FactoryName, HikeError, Lane } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseLanesOptions extends Omit<UseQueryOptions<Lane[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  factoryNames?: FactoryName[];
  queryKey?: QueryKey;
}

export const useLanes = ({ factoryNames, queryKey = [], ...options }: UseLanesOptions = {}) =>
  useQuery<Lane[], HikeError<null>>({
    queryKey: ['lanes', factoryNames, queryKey],
    queryFn: async () => await getLanes({ factoryNames }),
    ...options
  });

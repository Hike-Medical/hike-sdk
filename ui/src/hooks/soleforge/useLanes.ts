import { getLanes } from '@hike/services';
import { HikeError, Lane } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseLanesOptions extends Omit<UseQueryOptions<Lane[], HikeError<null>>, 'queryFn' | 'queryKey'> {
  queryKey?: QueryKey;
}

export const useLanes = ({ queryKey = [], ...options }: UseLanesOptions = {}) =>
  useQuery<Lane[], HikeError<null>>({
    queryKey: ['lanes', queryKey],
    queryFn: async () => await getLanes(),
    ...options
  });

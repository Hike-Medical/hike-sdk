import type { SafeUserExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchSelf } from '../../api/user.service';
import { HikeError } from '../../errors/HikeError';

export interface useFetchSelfOptions
  extends Omit<UseQueryOptions<SafeUserExtended, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useFetchSelf = ({ queryKey = [], ...options }: useFetchSelfOptions) =>
  useQuery({
    queryKey: ['selfUser', queryKey],
    queryFn: async () => await fetchSelf(),
    ...options
  });

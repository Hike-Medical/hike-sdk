import type { SafeUser } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../../api/user.service';
import { HikeError } from '../../errors/HikeError';

export interface useCurrentUserOptions
  extends Omit<UseQueryOptions<SafeUser, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useCurrentUser = ({ queryKey = [], ...options }: useCurrentUserOptions) =>
  useQuery({
    queryKey: ['useCurrentUser', queryKey],
    queryFn: async () => await fetchCurrentUser(),
    ...options
  });

import { fetchCurrentUser } from '@hike/services';
import type { SafeUser } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseCurrentUserOptions extends Omit<UseQueryOptions<SafeUser, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useCurrentUser = ({ queryKey = [], ...options }: UseCurrentUserOptions) =>
  useQuery({
    queryKey: ['useCurrentUser', queryKey],
    queryFn: async () => await fetchCurrentUser(),
    ...options
  });

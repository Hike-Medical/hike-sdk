import type { SafeUser } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../../api/user.service';
import { HikeError } from '../../errors/HikeError';

interface UseCurrentUserOptions extends Omit<UseQueryOptions<SafeUser, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useCurrentUser = ({ queryKey = [], ...options }: UseCurrentUserOptions) =>
  useQuery({
    queryKey: ['useCurrentUser', queryKey],
    queryFn: async () => await fetchCurrentUser(),
    ...options
  });

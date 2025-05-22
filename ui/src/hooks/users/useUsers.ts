import { fetchUsers } from '@hike/services';
import type { GetUsersParams, PagedResponse, SafeUserExtended } from '@hike/types';
import { HikeError } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseUsersOptions
  extends Omit<UseQueryOptions<PagedResponse<SafeUserExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetUsersParams;
  queryKey?: QueryKey;
}

export const useUsers = ({ params, queryKey = [], ...options }: UseUsersOptions = {}) =>
  useQuery({
    queryKey: ['users', params, queryKey],
    queryFn: async () => await fetchUsers(params),
    ...options
  });

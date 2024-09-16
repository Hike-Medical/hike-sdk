import type { GetUsersParams, PagedResponse, UserExtended } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../api/user.service';
import { HikeError } from '../../errors/HikeError';

export interface UseUsersOptions
  extends Omit<UseQueryOptions<PagedResponse<UserExtended[]>, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: GetUsersParams;
  queryKey?: QueryKey;
}

export const useUsers = ({ params, queryKey = [], ...options }: UseUsersOptions = {}) =>
  useQuery({
    queryKey: ['users', params, queryKey],
    queryFn: async () => await fetchUsers(params),
    ...options
  });

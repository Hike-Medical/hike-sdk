import { UserExtended } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchUserById } from '../../api/user.service';
import { ResponseError } from '../../errors/ResponseError';

export interface UseUserOptions
  extends Omit<UseQueryOptions<UserExtended, ResponseError<null>>, 'queryKey' | 'queryFn'> {
  userId: string;
}

export const useUser = ({ userId, ...options }: UseUserOptions) =>
  useQuery<UserExtended, ResponseError<null>>({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(userId),
    ...options
  });

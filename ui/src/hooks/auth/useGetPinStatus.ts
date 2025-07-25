import { getPinStatus } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useGetPinStatus = (options?: Omit<UseQueryOptions<boolean, HikeError<null>>, 'queryKey' | 'queryFn'>) =>
  useQuery({
    queryKey: ['pinStatus'],
    queryFn: async () => await getPinStatus(),
    ...options
  });

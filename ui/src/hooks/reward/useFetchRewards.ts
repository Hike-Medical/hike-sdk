import { fetchCompanyRewards } from '@hike/services';
import { HikeError, Reward } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFetchRewards = (
  queryOptions?: Omit<UseQueryOptions<Reward[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['reward'],
    queryFn: async () => await fetchCompanyRewards(),
    ...queryOptions
  });

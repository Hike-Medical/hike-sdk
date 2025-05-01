import { fetchCompanyRewards, HikeError } from '@hike/services';
import { Reward } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFetchRewards = (
  queryOptions?: Omit<UseQueryOptions<Reward[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['reward'],
    queryFn: async () => await fetchCompanyRewards(),
    ...queryOptions
  });

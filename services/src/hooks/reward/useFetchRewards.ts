import { Reward } from '@hike/types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchCompanyRewards } from '../../api/reward.service';
import { HikeError } from '../../errors/HikeError';

export const useFetchRewards = (
  queryOptions?: Omit<UseQueryOptions<Reward[], HikeError<null>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['reward'],
    queryFn: () => fetchCompanyRewards(),
    ...queryOptions
  });
};

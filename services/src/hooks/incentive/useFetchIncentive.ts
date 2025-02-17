import { Incentive, IncentiveType } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchReferralIncentive } from 'api/incentive.service';
import { HikeError } from '../../errors/HikeError';

export const useFetchIncentive = (
  incentiveType: IncentiveType,
  queryOptions?: Omit<UseQueryOptions<Incentive, HikeError<null>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['incentive', incentiveType],
    queryFn: () => fetchReferralIncentive(incentiveType),
    ...queryOptions
  });
};

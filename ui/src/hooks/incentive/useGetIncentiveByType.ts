import { findIncentiveByType } from '@hike/services';
import { HikeError, Incentive, IncentiveType } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseGetIncentiveByTypeOptions
  extends Omit<UseQueryOptions<Incentive | null, HikeError<null>>, 'queryKey' | 'queryFn'> {
  incentiveType: IncentiveType;
  queryKey?: QueryKey;
}

export const useGetIncentiveByType = ({ incentiveType, queryKey = [], ...options }: UseGetIncentiveByTypeOptions) =>
  useQuery({
    queryKey: ['incentive', incentiveType, queryKey],
    queryFn: async () => await findIncentiveByType(incentiveType),
    ...options
  });

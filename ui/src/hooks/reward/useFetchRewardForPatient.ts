import { HikeError, fetchRewardsForPatient } from '@hike/services';
import { RewardInfo } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useFetchRewardForPatient = (
  patientId: string,
  queryOptions?: Omit<UseQueryOptions<RewardInfo[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['reward', patientId],
    queryFn: () => fetchRewardsForPatient(patientId),
    ...queryOptions
  });

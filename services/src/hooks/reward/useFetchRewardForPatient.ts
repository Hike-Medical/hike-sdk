import { RewardInfo } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchRewardsForPatient } from '../../api/reward.service';
import { HikeError } from '../../errors/HikeError';

export const useFetchRewardForPatient = (
  patientId: string,
  queryOptions?: Omit<UseQueryOptions<RewardInfo[], HikeError<null>>, 'queryKey' | 'queryFn'>
) =>
  useQuery({
    queryKey: ['reward', patientId],
    queryFn: () => fetchRewardsForPatient(patientId),
    ...queryOptions
  });

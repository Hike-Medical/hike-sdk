import { IncentiveType, PatientIncentive } from '@hike/types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { fetchAllPatientIncentivesByType } from '../../api/incentive.service';
import { HikeError } from '../../errors/HikeError';

export const useFetchPatientIncentiveByType = (
  incentiveType: IncentiveType,
  queryOptions?: Omit<UseQueryOptions<PatientIncentive[], HikeError<null>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['patientIncentive', incentiveType],
    queryFn: () => fetchAllPatientIncentivesByType(incentiveType),
    ...queryOptions
  });
};

import { fetchPatientIncentivesByType } from '@hike/services';
import { HikeError, IncentiveType, PatientIncentive } from '@hike/types';
import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

interface UseGetPatientIncentivesByTypeOptions
  extends Omit<UseQueryOptions<PatientIncentive[], HikeError<null>>, 'queryKey' | 'queryFn'> {
  incentiveType: IncentiveType;
  queryKey?: QueryKey;
}

export const useGetPatientIncentivesByType = ({
  incentiveType,
  queryKey = [],
  ...options
}: UseGetPatientIncentivesByTypeOptions) =>
  useQuery({
    queryKey: ['patientIncentive', incentiveType, queryKey],
    queryFn: async () => await fetchPatientIncentivesByType(incentiveType),
    ...options
  });

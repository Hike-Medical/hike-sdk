import { checkEnrollmentEligibility } from '@hike/services';
import type { CheckEnrollmentEligibilityResponse, HikeError } from '@hike/types';
import { QueryKey, useQuery, type UseQueryOptions } from '@tanstack/react-query';

interface UseCheckEnrollmentEligibilityOptions
  extends Omit<UseQueryOptions<CheckEnrollmentEligibilityResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  patientId: string;
  queryKey?: QueryKey;
}

export const useCheckEnrollmentEligibility = ({
  patientId,
  queryKey = [],
  ...options
}: UseCheckEnrollmentEligibilityOptions) =>
  useQuery({
    queryKey: ['checkEnrollmentEligibility', patientId, queryKey],
    queryFn: async () => await checkEnrollmentEligibility(patientId),
    ...options
  });

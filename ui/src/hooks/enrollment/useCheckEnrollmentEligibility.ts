import { checkEnrollmentEligibility } from '@hike/services';
import type { CheckEnrollmentEligibilityParams, CheckEnrollmentEligibilityResponse, HikeError } from '@hike/types';
import { QueryKey, useQuery, type UseQueryOptions } from '@tanstack/react-query';

interface UseCheckEnrollmentEligibilityOptions
  extends Omit<UseQueryOptions<CheckEnrollmentEligibilityResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: CheckEnrollmentEligibilityParams;
  queryKey?: QueryKey;
}

export const useCheckEnrollmentEligibility = ({
  params,
  queryKey = [],
  ...options
}: UseCheckEnrollmentEligibilityOptions) =>
  useQuery({
    queryKey: ['checkEnrollmentEligibility', params.patientId, params.externalId, queryKey],
    queryFn: async () => await checkEnrollmentEligibility(params),
    ...options
  });

import { findPatientBenefits } from '@hike/services';
import type { FindPatientBenefitsParams, FindPatientBenefitsResponse, HikeError } from '@hike/types';
import { QueryKey, useQuery, type UseQueryOptions } from '@tanstack/react-query';

interface UseFindPatientBenefitsOptions
  extends Omit<UseQueryOptions<FindPatientBenefitsResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params: FindPatientBenefitsParams;
  queryKey?: QueryKey;
}

export const useFindPatientBenefits = ({ params, queryKey = [], ...options }: UseFindPatientBenefitsOptions) =>
  useQuery({
    queryKey: ['findPatientBenefits', params.patientId, queryKey],
    queryFn: async () => await findPatientBenefits(params),
    ...options
  });


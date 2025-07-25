import { findCurrentPatient } from '@hike/services';
import { HikeError, PatientUserResponse } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseFindCurrentPatientOptions
  extends Omit<UseQueryOptions<PatientUserResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  params?: { companyId: string } | { slug: string };
  queryKey?: QueryKey;
}

export const useCurrentPatient = ({ params, queryKey = [], ...options }: UseFindCurrentPatientOptions = {}) =>
  useQuery({
    queryKey: ['currentPatient', queryKey],
    queryFn: async () => await findCurrentPatient(params),
    ...options
  });

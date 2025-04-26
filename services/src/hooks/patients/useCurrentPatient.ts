import { PatientUserResponse } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { findCurrentPatient } from '../../api/patient.service';
import { HikeError } from '../../errors/HikeError';

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

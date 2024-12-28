import { PatientUserResponse } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { findCurrentPatient } from '../../api/patient.service';
import { HikeError } from '../../errors/HikeError';

export interface UseFindCurrentPatientOptions
  extends Omit<UseQueryOptions<PatientUserResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const useCurrentPatient = ({ queryKey = [], ...options }: UseFindCurrentPatientOptions = {}) =>
  useQuery({
    queryKey: ['currentPatient', queryKey],
    queryFn: async () => await findCurrentPatient(),
    ...options
  });

import { PatientUserResponse } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { findPatientByUserId } from '../../api/patient.service';
import { HikeError } from '../../errors/HikeError';

export interface UseFindPatientByUserIdOptions
  extends Omit<UseQueryOptions<PatientUserResponse, HikeError<null>>, 'queryKey' | 'queryFn'> {
  queryKey?: QueryKey;
}

export const usePatientByUserId = ({ queryKey = [], ...options }: UseFindPatientByUserIdOptions = {}) =>
  useQuery({
    queryKey: ['patientsByUserId', queryKey],
    queryFn: async () => await findPatientByUserId(),
    ...options
  });

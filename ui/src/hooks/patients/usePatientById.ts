import { findPatientById, HikeError } from '@hike/services';
import { PatientExtended } from '@hike/types';
import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

interface UseFindPatientByIdOptions
  extends Omit<UseQueryOptions<PatientExtended, HikeError<null>>, 'queryKey' | 'queryFn'> {
  patientId: string;
  queryKey?: QueryKey;
  enabled?: boolean;
}

export const usePatientById = ({ patientId, queryKey = [], ...options }: UseFindPatientByIdOptions) =>
  useQuery({
    queryKey: ['patientsById', patientId, queryKey],
    queryFn: async () => await findPatientById(patientId),
    ...options
  });

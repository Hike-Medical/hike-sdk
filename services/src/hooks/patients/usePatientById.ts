import { PatientExtended } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findPatientById } from '../../api/patient.service';
import { HikeError } from '../../errors/HikeError';

export interface UseFindPatientByIdOptions {
  key?: string[];
  enabled?: boolean;
  patientId: string;
}

export const usePatientById = ({ key = [], enabled = true, ...params }: UseFindPatientByIdOptions) =>
  useQuery<PatientExtended, HikeError<null>>({
    queryKey: ['patientsById', ...key, params],
    queryFn: async () => await findPatientById(params.patientId),
    enabled
  });

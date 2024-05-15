import { PatientExtended } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findPatientById } from '../api/patient.service';
import { ResponseError } from '../errors/ResponseError';

export interface UseFindPatientByIdOptions {
  key?: string[];
  enabled?: boolean;
  patientId: string;
}

export const usePatientById = ({ key = [], enabled = true, ...params }: UseFindPatientByIdOptions) =>
  useQuery<PatientExtended, ResponseError<null>>({
    queryKey: ['patientsById', ...key, params],
    queryFn: async () => findPatientById(params.patientId),
    enabled
  });

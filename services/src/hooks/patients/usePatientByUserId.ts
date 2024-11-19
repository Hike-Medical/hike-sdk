import { PatientUserResponse } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findPatientByUserId } from '../../api/patient.service';
import { HikeError } from '../../errors/HikeError';

export interface UseFindPatientByUserIdOptions {
  key?: string[];
  enabled?: boolean;
}

export const usePatientByUserId = ({ key = [], enabled = true, ...params }: UseFindPatientByUserIdOptions) =>
  useQuery<PatientUserResponse, HikeError<null>>({
    queryKey: ['patientsByUserId', ...key, params],
    queryFn: async () => await findPatientByUserId(),
    enabled
  });

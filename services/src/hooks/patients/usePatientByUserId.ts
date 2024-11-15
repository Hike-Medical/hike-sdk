import { CompanyPatient, CompanyUser, Patient } from '@hike/types';
import { useQuery } from '@tanstack/react-query';
import { findPatientByUserId } from '../../api/patient.service';
import { HikeError } from '../../errors/HikeError';

export interface UseFindPatientByUserIdOptions {
  key?: string[];
  enabled?: boolean;
}

export const usePatientByUserId = ({ key = [], enabled = true, ...params }: UseFindPatientByUserIdOptions) =>
  useQuery<{ patient: Patient; companyPatient: CompanyPatient; companyUser: CompanyUser }, HikeError<null>>({
    queryKey: ['patientsByUserId', ...key, params],
    queryFn: async () => await findPatientByUserId(),
    enabled
  });

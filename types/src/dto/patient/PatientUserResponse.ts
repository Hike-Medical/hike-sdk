import { CompanyPatient, CompanyUser, Patient } from '@prisma/client';
import { SafeUser } from '../../entities/SafeUser';

export interface PatientUserResponse {
  companyPatient: CompanyPatient & { patient: Patient };
  companyUser: CompanyUser & { user: SafeUser };
}

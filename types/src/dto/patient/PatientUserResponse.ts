import { CompanyPatient, CompanyUser, Patient } from '../../../prisma/index';
import { SafeUser } from '../../entities/SafeUser';

export interface PatientUserResponse {
  companyPatient: CompanyPatient & { patient: Patient };
  companyUser: CompanyUser & { user: SafeUser };
}

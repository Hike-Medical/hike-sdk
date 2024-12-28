import { CompanyPatient, CompanyUser, Patient } from '../../../prisma';
import { SafeUser } from '../../entities/SafeUser';

export interface PatientUserResponse {
  companyPatient: CompanyPatient & { patient: Patient };
  companyUser: CompanyUser & { user: SafeUser };
}

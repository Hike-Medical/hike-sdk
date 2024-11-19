import { CompanyPatient, CompanyUser, Patient } from '../../../prisma';

export interface PatientUserResponse {
  companyPatient: CompanyPatient & { patient: Patient };
  companyUser: CompanyUser;
}

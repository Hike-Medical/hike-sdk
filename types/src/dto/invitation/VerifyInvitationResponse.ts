import { AccountVerification, CompanyPatient, Patient } from '../../../prisma';
import { SafeCompany } from '../../entities/SafeCompany';

export interface VerifyInvitationResponse {
  invitation: Omit<AccountVerification, 'token'>;
  company?: SafeCompany;
  companyPatient?: CompanyPatient & { patient: Patient };
}

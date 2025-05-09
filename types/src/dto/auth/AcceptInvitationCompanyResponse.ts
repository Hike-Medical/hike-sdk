import { SafeCompany } from '../../entities/SafeCompany';
import { UserExtended } from '../../entities/UserExtended';

export interface AcceptInvitationCompanyResponse {
  user: UserExtended;
  company: SafeCompany;
}

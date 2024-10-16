import { CompanyRole } from '../../../prisma';

export interface UpdateCompanyInvitationParams {
  contact: string;
  role: CompanyRole;
  verified?: boolean;
  extend?: boolean;
  url?: string;
}

export interface UpdateCompanyInvitationsParams {
  invitations: UpdateCompanyInvitationParams[];
}

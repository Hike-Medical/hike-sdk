import { CompanyRole } from '../../../prisma';

export interface UpdateCompanyInvitationParams {
  contact: string;
  role?: CompanyRole | null;
  extendExpiry?: boolean;
  redirectUrl?: string;
}

export interface UpdateCompanyInvitationsParams {
  invitations: UpdateCompanyInvitationParams[];
}

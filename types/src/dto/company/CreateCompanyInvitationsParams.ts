import { CompanyRole, ContactType } from '../../../prisma';

export interface CreateCompanyInvitationParams {
  contact: string;
  contactType: ContactType;
  role?: CompanyRole;
  url: string;
}

export interface CreateCompanyInvitationsParams {
  invitations: CreateCompanyInvitationParams[];
}

import { CompanyRole, ContactType } from '../../../prisma';

export interface CreateCompanyInvitationParams {
  contact: string;
  contactType: ContactType;
  role: CompanyRole;
  verified?: boolean;
  url: string;
}

export interface CreateCompanyInvitationsParams {
  invitations: CreateCompanyInvitationParams[];
}

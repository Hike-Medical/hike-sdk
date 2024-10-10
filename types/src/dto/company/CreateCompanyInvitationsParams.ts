import { CompanyRole, ContactType } from '../../../prisma';

export interface CreateCompanyInvitationParams {
  contact: string;
  contactType: ContactType
  role: CompanyRole
  verified?: boolean;
}

export interface CreateCompanyInvitationsParams {
  invitations: CreateCompanyInvitationParams[];
}
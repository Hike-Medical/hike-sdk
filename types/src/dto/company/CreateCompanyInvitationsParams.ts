import { AppId } from 'config/AppId';
import { CompanyRole, ContactType } from '../../../prisma';

export interface CreateCompanyInvitationParams {
  contact: string;
  contactType: ContactType;
  role?: CompanyRole | null;
  redirectUrl?: string;
  appId?: AppId;
}

export interface CreateCompanyInvitationsParams {
  invitations: CreateCompanyInvitationParams[];
  notificationId?: string;
}

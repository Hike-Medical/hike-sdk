import { AppId } from 'config/AppId';
import { CompanyRole, ContactType } from '../../../prisma';

export interface CreateInvitationParams {
  contact: string;
  contactType: ContactType;
  role?: CompanyRole | null;
  redirectUrl?: string;
  appId?: AppId;
}

export interface CreateInvitationsParams {
  invitations: CreateInvitationParams[];
  notificationId?: string;
}

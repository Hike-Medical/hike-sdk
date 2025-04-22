import { CompanyRole, ContactType } from '@prisma/client';
import { AppId } from 'config/AppId';

export interface CreateInvitationParams {
  contact: string;
  contactType: ContactType;
  role?: CompanyRole | null;
  redirectUrl?: string;
  appId?: AppId;
  notificationId?: string;
}

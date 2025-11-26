import { AppId } from 'config/AppId';
import { CompanyPermission, CompanyRole, ContactType } from '../../../prisma';

export interface CreateInvitationParams {
  contact: string;
  contactType: ContactType;
  role?: CompanyRole | null;
  permissions?: CompanyPermission[];
  redirectUrl?: string;
  appId?: AppId;
  notificationId?: string;
}

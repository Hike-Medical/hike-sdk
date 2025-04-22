import { CompanyRole } from '../../../prisma/index';

export interface UpdateInvitationParams {
  contact: string;
  role?: CompanyRole | null;
  extendExpiry?: boolean;
  redirectUrl?: string;
}

export interface UpdateInvitationsParams {
  invitations: UpdateInvitationParams[];
}

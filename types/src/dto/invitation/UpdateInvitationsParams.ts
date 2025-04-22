import { CompanyRole } from '@prisma/client';

export interface UpdateInvitationParams {
  contact: string;
  role?: CompanyRole | null;
  extendExpiry?: boolean;
  redirectUrl?: string;
}

export interface UpdateInvitationsParams {
  invitations: UpdateInvitationParams[];
}

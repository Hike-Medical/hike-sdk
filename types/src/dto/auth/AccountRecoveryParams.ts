import { AccountVerificationType, ContactType } from '@prisma/client';

export interface AccountRecoveryParams {
  type: AccountVerificationType;
  contact: string;
  contactType: ContactType;
  redirectUrl?: string;
}

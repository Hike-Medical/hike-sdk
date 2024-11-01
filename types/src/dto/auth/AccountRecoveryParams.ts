import { AccountVerificationType, ContactType } from '../../../prisma';

export interface AccountRecoveryParams {
  type: AccountVerificationType;
  contact: string;
  contactType: ContactType;
  redirectUrl?: string;
}

import { AccountVerificationType, ContactType } from '../../../prisma/index';

export interface AccountRecoveryParams {
  type: AccountVerificationType;
  contact: string;
  contactType: ContactType;
  redirectUrl?: string;
}

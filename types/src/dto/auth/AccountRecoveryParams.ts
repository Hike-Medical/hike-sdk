import { AccountRecoveryType, ContactType } from '../../../prisma';

export interface AccountRecoveryParams {
  type: AccountRecoveryType;
  contact: string;
  contactType: ContactType;
  redirectUrl?: string;
}

import { AccountRecoveryType } from '../../../prisma';

export interface AccountRecoveryParams {
  email: string;
  type: AccountRecoveryType;
  url: string;
}

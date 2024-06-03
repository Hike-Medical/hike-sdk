import { OrderAuthorizationStatus } from '../../../prisma';

export interface SubmitOrderBody {
  signatureBase64Data: string;
  orderAuthorizationStatus?: OrderAuthorizationStatus;
}

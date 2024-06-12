import { OrderAuthorizationStatus } from '../../../prisma';

export interface SubmitOrderParams {
  signatureBase64Data: string;
  orderAuthorizationStatus?: OrderAuthorizationStatus;
}

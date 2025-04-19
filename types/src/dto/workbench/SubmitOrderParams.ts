import { OrderAuthorizationStatus } from '../../../prisma';

export interface SubmitOrderParams {
  signatureBase64Data?: string;
  overwriteSignature?: boolean;
  orderAuthorizationStatus?: OrderAuthorizationStatus;
}

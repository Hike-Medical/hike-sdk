import { OrderAuthorizationStatus } from '../../../prisma/index';

export interface SubmitOrderParams {
  signatureBase64Data?: string;
  overwriteSignature?: boolean;
  orderAuthorizationStatus?: OrderAuthorizationStatus;
}

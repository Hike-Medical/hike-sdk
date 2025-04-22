import { OrderAuthorizationStatus } from '@prisma/client';

export interface SubmitOrderParams {
  signatureBase64Data?: string;
  overwriteSignature?: boolean;
  orderAuthorizationStatus?: OrderAuthorizationStatus;
}

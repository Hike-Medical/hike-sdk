import { AgreementStatus, AgreementType } from '@prisma/client';

export interface AcceptTermsParams {
  type: AgreementType;
  status?: AgreementStatus;
}

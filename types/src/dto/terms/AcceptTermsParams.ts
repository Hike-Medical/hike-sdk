import { AgreementStatus, AgreementType } from '../../../prisma';

export interface AcceptTermsParams {
  type: AgreementType;
  status?: AgreementStatus;
}

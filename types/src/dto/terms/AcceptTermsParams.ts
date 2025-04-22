import { AgreementStatus, AgreementType } from '../../../prisma/index';

export interface AcceptTermsParams {
  type: AgreementType;
  status?: AgreementStatus;
}

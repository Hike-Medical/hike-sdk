import { EvaluationAttachmentStatus, EvaluationAttachmentType } from '../../../prisma';

const EvaluationAttachmentTypeEnum = {
  FORM_SUBMISSION: 'FORM_SUBMISSION',
  FAX: 'FAX',
  OCR_OUTPUT: 'OCR_OUTPUT',
  EXTRACTION_OUTPUT: 'EXTRACTION_OUTPUT',
  CERTIFYING_STATEMENT: 'CERTIFYING_STATEMENT',
  CERTIFIER_PACKET: 'CERTIFIER_PACKET',
  PRESCRIBER_PACKET: 'PRESCRIBER_PACKET'
} as const satisfies Record<EvaluationAttachmentType, EvaluationAttachmentType> & {
  [K in EvaluationAttachmentType]: K;
};

export const EvaluationAttachmentTypeList = Object.values(EvaluationAttachmentTypeEnum);

const EvaluationAttachmentStatusEnum = {
  CREATED: 'CREATED',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  FAILED: 'FAILED'
} as const satisfies Record<EvaluationAttachmentStatus, EvaluationAttachmentStatus> & {
  [K in EvaluationAttachmentStatus]: K;
};

export const EvaluationAttachmentStatusList = Object.values(EvaluationAttachmentStatusEnum);

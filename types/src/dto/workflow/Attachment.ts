import { EvaluationAttachmentStatus, EvaluationAttachmentType } from '../../../prisma';

const EvaluationAttachmentTypeEnum = {
  FORM_SUBMISSION: 'FORM_SUBMISSION',
  FAX: 'FAX',
  OCR_OUTPUT: 'OCR_OUTPUT',
  EXTRACTION_OUTPUT: 'EXTRACTION_OUTPUT',
  CERTIFYING_STATEMENT: 'CERTIFYING_STATEMENT',
  PRESCRIPTION: 'PRESCRIPTION',
  PRESCRIBER_NOTES: 'PRESCRIBER_NOTES',
  STANDARD_WORK_ORDER: 'STANDARD_WORK_ORDER',
  CERTIFIER_NOTES: 'CERTIFIER_NOTES',
  COSIGNED_NOTES: 'COSIGNED_NOTES',
  UNCERTAIN: 'UNCERTAIN'
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

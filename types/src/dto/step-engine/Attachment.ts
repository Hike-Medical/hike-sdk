import { EvaluationAttachmentType, EvaluationAttachmentStatus } from '../../../prisma';

const EvaluationAttachmentTypeEnum = {
  REFERRING_PHYSICIAN: 'REFERRING_PHYSICIAN',
  PRIMARY_PHYSICIAN: 'PRIMARY_PHYSICIAN',
  APPOINTMENT_IMPORT: 'APPOINTMENT_IMPORT',
  FORM_SUBMISSION: 'FORM_SUBMISSION'
} as const satisfies Record<EvaluationAttachmentType, EvaluationAttachmentType> & {
  [K in EvaluationAttachmentType]: K;
};

export const EvaluationAttachmentTypeList = Object.values(EvaluationAttachmentTypeEnum);

const EvaluationAttachmentStatusEnum = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  DENIED: 'DENIED',
  FAILED: 'FAILED'
} as const satisfies Record<EvaluationAttachmentStatus, EvaluationAttachmentStatus> & {
  [K in EvaluationAttachmentStatus]: K;
};

export const EvaluationAttachmentStatusList = Object.values(EvaluationAttachmentStatusEnum);

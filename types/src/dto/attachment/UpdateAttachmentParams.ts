import { EvaluationAttachmentStatus, Prisma } from '../../../prisma';

export interface UpdateAttachmentParams {
  status: EvaluationAttachmentStatus;
  metadata?: Prisma.JsonValue;
  companyId: string;
}

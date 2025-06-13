import { JsonValue } from '@prisma/client/runtime/library';
import { EvaluationAttachmentStatus } from '../../../prisma';

export interface UpdateAttachmentParams {
  status: EvaluationAttachmentStatus;
  metadata?: JsonValue;
  evaluationId?: string;
}

import { EvaluationAttachmentStatus, EvaluationAttachmentType } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface GetEvaluationAttachmentsParams extends PagedParams {
  statuses?: EvaluationAttachmentStatus[];
  evaluationId?: string;
  type?: EvaluationAttachmentType;
}

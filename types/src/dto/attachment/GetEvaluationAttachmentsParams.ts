import { EvaluationAttachmentStatus } from '@prisma/client';
import type { PagedParams } from '../PagedParams';

export interface GetEvaluationAttachmentsParams extends PagedParams {
  statuses?: EvaluationAttachmentStatus[];
  evaluationId?: string;
}

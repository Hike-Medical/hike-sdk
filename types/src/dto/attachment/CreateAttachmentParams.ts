import { EvaluationAttachmentType } from '../../../prisma';

export interface CreateAttachmentParams {
  name: string;
  tags?: Record<string, string>;
  attachmentType: EvaluationAttachmentType;
}

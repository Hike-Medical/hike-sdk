import { EvaluationAttachmentStatus, EvaluationAttachmentType } from '../../../prisma';

export interface WorkflowAttachment {
  id: string;
  name: string;
  types: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  isComplete?: boolean;
}

export interface AttachmentPresignedUrl {
  id: string;
  name: string;
  presignedUrl: string;
  contentType: string;
}

export interface UpdateWorkflowAttachmentParams {
  status?: EvaluationAttachmentStatus;
  statusReason?: string;
  types: EvaluationAttachmentType[];
  metadata?: Record<string, unknown>;
}

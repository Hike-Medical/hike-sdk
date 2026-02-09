import { EvaluationAttachmentStatus, EvaluationAttachmentType, AnnotationType } from '../../../prisma';

export interface WorkflowAttachment {
  id: string;
  workflowId?: string;
  name: string;
  types: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  isComplete?: boolean;
  annotations?: AnnotationDto[];
}

export interface AttachmentPresignedUrl {
  id: string;
  name: string;
  presignedUrl: string;
  contentType: string;
}

export interface AttachmentPageClassification {
  pageNumber: number;
  classifications: string[];
}

/**
 * Content structure for CLASSIFICATION annotations
 */
export interface ClassificationContent {
  pageClassifications: AttachmentPageClassification[];
}

/**
 * Content structure for skipped CLASSIFICATION annotations
 */
export interface SkippedClassificationContent {
  skipped: true;
}

export type AnnotationContent = ClassificationContent | SkippedClassificationContent;

/**
 * User info included in annotation responses
 */
export interface AnnotationUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

/**
 * Full annotation response from the Annotation table
 */
export interface AnnotationDto {
  id: string;
  attachmentId: string;
  userId: string;
  type: AnnotationType;
  content: AnnotationContent;
  createdAt: string;
  user?: AnnotationUser;
}

/**
 * Parameters for creating a new annotation
 */
export interface CreateAnnotationParams {
  type: AnnotationType;
  content: AnnotationContent;
}

export interface UpdateWorkflowAttachmentParams {
  status?: EvaluationAttachmentStatus;
  statusReason?: string;
  types: EvaluationAttachmentType[];
  metadata?: Record<string, unknown>;
  isComplete?: boolean;
  deactivateFacts?: boolean;
}

import { EvaluationAttachmentStatus, EvaluationAttachmentType } from '../../../prisma';

export interface WorkflowAttachment {
  id: string;
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

/** @deprecated Use AnnotationDto with the new Annotation table instead */
export interface AttachmentClassification {
  userId: string;
  date: string;
  pageClassifications: AttachmentPageClassification[];
}

/** @deprecated Use AnnotationClassifications with the new Annotation table instead */
export interface AttachmentAnnotations {
  classifications: AttachmentClassification[];
}

/**
 * The JSON structure stored in the Annotation table's classifications field
 */
export interface AnnotationClassifications {
  pageClassifications: AttachmentPageClassification[];
}

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
  createdAt: string;
  classifications: AnnotationClassifications;
  user?: AnnotationUser;
}

/**
 * Parameters for creating a new annotation
 */
export interface CreateAnnotationParams {
  classifications: AnnotationClassifications;
}

export interface UpdateWorkflowAttachmentParams {
  status?: EvaluationAttachmentStatus;
  statusReason?: string;
  types: EvaluationAttachmentType[];
  metadata?: Record<string, unknown>;
  isComplete?: boolean;
  deactivateFacts?: boolean;
  /** @deprecated Use the dedicated annotation endpoint instead */
  annotations?: AttachmentAnnotations;
}

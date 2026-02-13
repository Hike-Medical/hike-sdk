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

/**
 * A single fact verification entry within a FACT annotation.
 * Records whether an extracted fact is correct, along with metadata.
 */
export interface FactVerificationEntry {
  /** The Fact record ID being verified */
  factId: string;
  /** The fact key (e.g. "patient.first_name") */
  key: string;
  /** The annotator's verdict on this fact */
  status: 'correct' | 'incorrect' | 'missing';
  /** The value the annotator found -- required when status is 'incorrect' */
  correctedValue?: string;
  /** Per-fact annotation metadata */
  metadata?: {
    isHandwritten?: boolean;
    /** Free-text notes from the annotator */
    notes?: string;
  };
}

/**
 * Content structure for FACT annotations (verification flow)
 */
export interface FactAnnotationContent {
  verifications: FactVerificationEntry[];
}

/**
 * Content structure for skipped FACT annotations
 */
export interface SkippedFactAnnotationContent {
  skipped: true;
}

/**
 * A single resolved fact within a REVIEW annotation.
 * Records the final verdict after comparing multiple annotators.
 */
export interface FactResolution {
  /** The Fact record ID that was resolved */
  factId: string;
  /** The fact key (e.g. "patient.first_name") */
  key: string;
  /** The final resolved status */
  resolvedStatus: 'correct' | 'incorrect' | 'missing';
  /** The resolved correct value when resolvedStatus is 'incorrect' */
  resolvedValue?: string;
  /** How this fact was resolved */
  method: 'consensus' | 'majority' | 'manual';
}

/**
 * Content structure for REVIEW annotations (conflict resolution)
 */
export interface FactReviewContent {
  resolutions: FactResolution[];
}

export type AnnotationContent =
  | ClassificationContent
  | SkippedClassificationContent
  | FactAnnotationContent
  | SkippedFactAnnotationContent
  | FactReviewContent;

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

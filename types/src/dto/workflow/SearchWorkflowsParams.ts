import { EvaluationAttachmentType } from '../../../prisma';
import { PagedParams } from '../PagedParams';

export enum WorkflowSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  EXPIRES_AT = 'expiresAt',
  ENDED_AT = 'endedAt',
  BEST_FACT_MATCH = 'bestFactMatch'
}

export interface FactFilter {
  factName: string;
  factValue: string;
}

export enum FactMatchMode {
  AND = 'AND',
  OR = 'OR'
}

export enum AnnotationFilter {
  /** Attachments with no classification annotations */
  NO_CLASSIFICATION_ANNOTATIONS = 'NO_CLASSIFICATION_ANNOTATIONS',
  /** Attachments not classified by the current user */
  NO_CLASSIFICATION_ANNOTATIONS_BY_USER = 'NO_CLASSIFICATION_ANNOTATIONS_BY_USER'
}

export interface SearchWorkflowFilter {
  workflowNames?: string[];
  status?: string[];
  hasErrors?: boolean;
  errorTypes?: string[];
  facts?: FactFilter[];
  factMatchMode?: FactMatchMode;
  fromStartTime?: string;
  toStartTime?: string;
  fromEndTime?: string;
  toEndTime?: string;
  tags?: string[];
  searchQuery?: string;
}

export interface SearchWorkflowsParams extends PagedParams {
  filter?: SearchWorkflowFilter;
  sortBy?: WorkflowSortBy;
  sortOrder?: 'asc' | 'desc';
  factsToInclude?: string[];
}

/**
 * Filter options for searching attachments
 */
export interface SearchAttachmentsFilter {
  type?: EvaluationAttachmentType;
  annotationFilter?: AnnotationFilter;
}

/**
 * Parameters for searching attachments
 */
export interface SearchAttachmentsParams extends PagedParams {
  filter?: SearchAttachmentsFilter;
}

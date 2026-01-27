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
  /** Workflows with attachments that have no annotations */
  NOT_ANNOTATED = 'NOT_ANNOTATED',
  /** Workflows with attachments not annotated by the current user */
  NOT_ANNOTATED_BY_USER = 'NOT_ANNOTATED_BY_USER'
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
  annotationFilter?: AnnotationFilter;
}

export interface SearchWorkflowsParams extends PagedParams {
  filter?: SearchWorkflowFilter;
  sortBy?: WorkflowSortBy;
  sortOrder?: 'asc' | 'desc';
  factsToInclude?: string[];
}

import { PagedParams } from '../PagedParams';

export enum WorkflowSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  EXPIRES_AT = 'expiresAt'
}

export interface FactFilter {
  factName: string;
  factValue: string;
}

export interface SearchWorkflowFilter {
  workflowNames?: string[];
  status?: string[];
  hasErrors?: boolean;
  errorTypes?: string[];
  facts?: FactFilter[];
}

export interface SearchWorkflowsParams extends PagedParams {
  filter?: SearchWorkflowFilter;
  sortBy?: WorkflowSortBy;
  sortOrder?: 'asc' | 'desc';
  factsToInclude?: string[];
}

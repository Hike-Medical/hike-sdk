import { PagedParams } from '../PagedParams';

export enum WorkflowSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  EXPIRES_AT = 'expiresAt'
}

export interface SearchWorkflowsParams extends PagedParams {
  workflowNames?: string[];
  status?: string[];
  factKey?: string;
  factValue?: string;
  errorsOnly?: boolean;
  sortBy?: WorkflowSortBy;
  includeFacts?: string[];
}

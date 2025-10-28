export interface SearchWorkflowsParams {
  workflowNames?: string[];
  status?: string[];
  factKey?: string;
  factValue?: string;
  errorsOnly?: boolean;
  includeErrorCount?: boolean;
}

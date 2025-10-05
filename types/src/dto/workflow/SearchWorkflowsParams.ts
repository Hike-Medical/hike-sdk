import { WorkflowStatus } from '../../../prisma';

export interface SearchWorkflowsParams {
  workflowNames?: string[];
  status?: WorkflowStatus[];
  factKey?: string;
  factValue?: string;
}

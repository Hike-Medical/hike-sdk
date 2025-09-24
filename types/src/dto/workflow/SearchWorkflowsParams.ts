import { WorkflowStatus } from '../../../prisma';

export interface SearchWorkflowsParams {
  workflowName?: string;
  status?: WorkflowStatus[];
  factKey?: string;
  factValue?: string;
}

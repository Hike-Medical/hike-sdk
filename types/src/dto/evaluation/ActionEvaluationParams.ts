import { WorkbenchCreatedReason } from '../../../prisma';

/**
 * Data transfer object for creating an evaluation as an insole.
 */
export interface ActionEvaluationParams {
  action: WorkbenchCreatedReason;
  notes?: string;
}

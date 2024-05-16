import { OrderAuthorizationStatus } from '../../../prisma';

/**
 * Data transfer object for creating an evaluation as an insole.
 */
export interface StartEvaluationInsoleParams {
  evaluationId: string;
  orderAuthorizationStatus?: OrderAuthorizationStatus;
}

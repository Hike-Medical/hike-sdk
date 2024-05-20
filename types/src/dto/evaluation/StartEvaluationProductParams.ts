import { ProductType } from '../../../prisma';

/**
 * Data transfer object for creating an evaluation as an insole.
 */
export interface StartEvaluationProductParams {
  evaluationId: string;
  productType: ProductType;
}

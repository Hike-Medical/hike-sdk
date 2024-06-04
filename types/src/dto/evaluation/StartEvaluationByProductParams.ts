import { ProductType } from '../../../prisma';

/**
 * Data transfer object for creating an evaluation as an insole.
 */
export interface StartEvaluationByProductParams {
  evaluationId: string;
  productType: ProductType;
}

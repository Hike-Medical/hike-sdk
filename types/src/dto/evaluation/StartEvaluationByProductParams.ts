import { ProductType, Side } from '@prisma/client';

/**
 * Data transfer object for creating an evaluation as an insole.
 */
export interface StartEvaluationByProductParams {
  evaluationId: string;
  productType: ProductType;
  sides?: Side[];
  referringPatientId?: string;
}

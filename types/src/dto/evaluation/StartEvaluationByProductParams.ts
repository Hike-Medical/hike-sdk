import { ProductType, Side } from '../../../prisma';
import { WorkbenchCustomization } from '../workbench/WorkbenchCustomization';

/**
 * Data transfer object for creating an evaluation as an insole.
 */
export interface StartEvaluationByProductParams {
  evaluationId: string;
  productType: ProductType;
  sides?: Side[];
  referringPatientId?: string;
  customization?: WorkbenchCustomization;
}

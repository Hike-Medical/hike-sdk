import { ProductType, Side } from '../../../prisma';
import { WorkbenchCustomization } from '../workbench/WorkbenchCustomization';
import { CreateEvaluationParams } from './CreateEvaluationParams';

export interface CreateEvaluationByProductParams extends CreateEvaluationParams {
  productType: ProductType;
  sides?: Side[];
  referringPatientId?: string;
  customization?: WorkbenchCustomization;
}

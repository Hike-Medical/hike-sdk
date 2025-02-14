import { ProductType, Side } from '../../../prisma';
import { CreateEvaluationParams } from './CreateEvaluationParams';

export interface CreateEvaluationByProductParams extends CreateEvaluationParams {
  productType: ProductType;
  sides?: Side[];
  referringPatientId?: string;
}

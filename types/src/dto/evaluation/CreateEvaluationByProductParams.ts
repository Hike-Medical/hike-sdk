import { ProductType } from '../../../prisma';
import { CreateEvaluationParams } from './CreateEvaluationParams';

export interface CreateEvaluationByProductParams extends CreateEvaluationParams {
  productType: ProductType;
}

import { ProductType } from '../../../prisma';
import { CreateEvaluationParams } from './CreateEvaluationParams';

export interface CreateEvaluationProductParams extends CreateEvaluationParams {
  productType: ProductType;
}

import { OrderAuthorizationStatus } from '../../../prisma';
import { CreateEvaluationParams } from './CreateEvaluationParams';

export interface CreateEvaluationInsoleParams extends CreateEvaluationParams {
  orderAuthorizationStatus?: OrderAuthorizationStatus;
}

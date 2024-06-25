import { OrderStatus } from '../../../prisma';
import { PagedParams } from '../../dto/PagedParams';

export interface GetAggregatedParams extends PagedParams {
  orderStatus?: OrderStatus[];
  validationStatus?: boolean | null;
  diabeticOnly?: boolean;
  authorizationStartDate?: string;
  authorizationEndDate?: string;
  searchQuery?: string;
}

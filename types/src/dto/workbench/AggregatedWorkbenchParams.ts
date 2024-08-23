import { OrderAuthorizationStatus, OrderStatus } from '../../../prisma';
import { PagedParams } from '../../dto/PagedParams';

export interface GetAggregatedParams extends PagedParams {
  orderStatus?: OrderStatus[];
  devValidationStatus?: boolean | null;
  validationStatus?: boolean | null;
  diabeticOnly?: boolean;
  submittedOnly?: boolean;
  authorizationStartDate?: string;
  authorizationEndDate?: string;
  searchQuery?: string;
  productType?: string;
  companySlugs?: string[];
  orderAuthorizationStatus?: OrderAuthorizationStatus[];
}

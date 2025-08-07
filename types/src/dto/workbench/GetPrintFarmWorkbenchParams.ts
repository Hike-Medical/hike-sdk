import { OrderStatus, ProductType } from '../../../prisma';
import { PagedParams } from '../PagedParams';

export interface GetPrintFarmWorkbenchParams extends PagedParams {
  prioritizeRushOrders?: boolean;
  diabeticOnly?: boolean;
  submittedOnly?: boolean;
  authorizationStartDate?: string;
  authorizationEndDate?: string;
  searchQuery?: string;
  productType?: ProductType[];
  companySlugs?: string[];
  orderAuthorizationStatus?: string[];
  orderStatus?: OrderStatus[];
  devValidationStatus?: boolean | null;
}

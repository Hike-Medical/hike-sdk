import { ProductType } from '../../../prisma';
import { PagedParams } from '../PagedParams';

export interface GetWorkbenchDevSummaryParams extends PagedParams {
  prioritizeRushOrders?: boolean;
  diabeticOnly?: boolean;
  submittedOnly?: boolean;
  authorizationStartDate?: string;
  authorizationEndDate?: string;
  searchQuery?: string;
  productType?: ProductType[];
  companySlugs?: string[];
  orderAuthorizationStatus?: string[];
  devValidationStatus?: boolean | null;
  /** Filter: prod rejected at date range (inclusive). */
  prodRejectedAtFrom?: string;
  prodRejectedAtTo?: string;
}

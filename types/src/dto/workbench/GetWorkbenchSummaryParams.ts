import { ProductType } from '../../../prisma';
import { PagedParams } from '../PagedParams';

export interface GetWorkbenchSummaryParams extends PagedParams {
  prioritizeRushOrders?: boolean;
  diabeticOnly?: boolean;
  submittedOnly?: boolean;
  authorizationStartDate?: string;
  authorizationEndDate?: string;
  searchQuery?: string;
  productType?: ProductType[];
  companySlugs?: string[];
}

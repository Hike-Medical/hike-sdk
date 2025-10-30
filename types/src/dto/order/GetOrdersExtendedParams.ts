import { OrderAuthorizationStatus, OrderStatus, ProductType } from '../../../prisma';

export interface GetOrdersExtendedParams {
  offset?: number;
  limit?: number;
  sortOrder?: 'asc' | 'desc';
  sortBy?: string;
  orderStatus?: OrderStatus[];
  productType?: ProductType[];
  diabeticOnly?: boolean;
  submittedOnly?: boolean;
  prioritizeRushed?: boolean;
  authorizationStartDate?: string;
  authorizationEndDate?: string;
  searchQuery?: string;
  companySlugs?: string[];
  orderAuthorizationStatus?: OrderAuthorizationStatus[];
  nullFilter?: string[];
  notNullFilter?: string[];
  pastDue?: boolean;
}

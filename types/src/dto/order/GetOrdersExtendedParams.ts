import { OrderAuthorizationStatus } from '../../../prisma';
import { PagedParams } from '../PagedParams';

export const GetOrdersExtendedFilter = [
  'id',
  'workbench.evaluation.poNumber',
  'workbench.patient.id',
  'workbench.patient.firstName',
  'workbench.product.type',
  'status',
  'workbench.createdReason'
] as const;

export type GetOrdersExtendedFilter = (typeof GetOrdersExtendedFilter)[number];

export const GetOrdersExtendedSortBy = [
  'id',
  'status',
  'createdAt',
  'updatedAt',
  'submittedAt',
  'completedAt',
  'committedDeliveryAt',
  'authorizationUpdatedAt'
] as const;

export type GetOrdersExtendedSortBy = (typeof GetOrdersExtendedSortBy)[number];

export interface GetOrdersExtendedParams extends PagedParams {
  searchQuery?: string;
  diabeticOnly?: boolean;
  submittedOnly?: boolean;
  prioritizeRushed?: boolean;
  authorizationStartDate?: string;
  authorizationEndDate?: string;
  orderAuthorizationStatus?: OrderAuthorizationStatus[];
  pastDue?: boolean;
  companySlugs?: string[];
  filter?: Partial<Record<GetOrdersExtendedFilter, string>>;
  sortBy?: GetOrdersExtendedSortBy;
  nullFilter?: string[];
  notNullFilter?: string[];
}

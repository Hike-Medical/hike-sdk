import { OrderAuthorizationStatus, OrderStatus, ProductType } from '../../../prisma';
import { PagedParams } from '../PagedParams';

export interface GetAggregatedParams extends PagedParams {
  orderStatus?: OrderStatus[];
  devValidationStatus?: boolean | null;
  validationStatus?: boolean | null;
  diabeticOnly?: boolean;
  submittedOnly?: boolean;
  includeSubmissions?: boolean;
  workbenchSubmissionsFilter?: [string, string | string[]];
  prioritizeRushed?: boolean;
  authorizationStartDate?: string;
  authorizationEndDate?: string;
  searchQuery?: string;
  pastDue?: boolean;
  deliveryWithin?: number;
  productType?: ProductType[];
  companySlugs?: string[];
  orderAuthorizationStatus?: OrderAuthorizationStatus[];
  filter?: Partial<
    Record<
      | 'workbenchId'
      | 'patientId'
      | 'patientFirstName'
      | 'patientLastName'
      | 'externalId'
      | 'userId'
      | 'poNumber'
      | 'orderStatus'
      | 'workbenchStatus'
      | 'productType',
      string
    >
  >;
  nullFilter?: string[];
  notNullFilter?: string[];
  facilityId?: string;
}

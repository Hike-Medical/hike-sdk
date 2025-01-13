import { OrderAuthorizationStatus, OrderStatus } from '../../../prisma';
import { PagedParams } from '../PagedParams';

export interface GetAggregatedParams extends PagedParams {
  orderStatus?: OrderStatus[];
  devValidationStatus?: boolean | null;
  validationStatus?: boolean | null;
  diabeticOnly?: boolean;
  submittedOnly?: boolean;
  includeSubmissions?: boolean;
  authorizationStartDate?: string;
  authorizationEndDate?: string;
  searchQuery?: string;
  productType?: string[];
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
      | 'workbenchStatus',
      string
    >
  >;
}

import { PagedParams } from '../../dto/PagedParams';

export interface GetAggregatedParams extends PagedParams {
  orderStatus?: string;
  validationStatus?: boolean | null;
  diabeticOnly?: boolean;
  authorizationStartDate?: string;
  authorizationEndDate?: string;
  searchQuery?: string;
}

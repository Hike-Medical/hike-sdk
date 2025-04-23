import { OrderAuthorizationStatus } from '../../../prisma';

export interface ModifyOrderAuthorizationParams {
  orderId: string;
  authorizationStatus: OrderAuthorizationStatus;
  companyIds?: string[];
  jwtToken?: string;
}

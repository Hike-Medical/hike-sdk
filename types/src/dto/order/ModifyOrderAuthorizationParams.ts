import { OrderAuthorizationStatus } from '../../../prisma/index';

export interface ModifyOrderAuthorizationParams {
  orderId: string;
  authorizationStatus: OrderAuthorizationStatus;
  companyIds?: string[];
  jwtToken?: string;
}

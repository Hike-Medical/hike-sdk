import { OrderAuthorizationStatus } from '@prisma/client';

export interface ModifyOrderAuthorizationParams {
  orderId: string;
  authorizationStatus: OrderAuthorizationStatus;
  companyIds?: string[];
  jwtToken?: string;
}

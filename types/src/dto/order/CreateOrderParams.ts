import type { OrderAuthorizationStatus, OrderStatus } from '../../../prisma';

export interface CreateOrderParams {
  workbenchId: string;
  status?: OrderStatus;
  authorizationStatus: OrderAuthorizationStatus;
  authorizationUpdatedAt?: Date;
  committedDeliveryAt?: Date;
  shippingAddressId?: string;
  parcelId?: string;
  isReprint?: boolean;
}

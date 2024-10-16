import { OrderAuthorizationStatus, OrderStatus } from '../../../prisma';

export interface UpdateOrderParams {
  status?: OrderStatus;
  authorizationStatus?: OrderAuthorizationStatus;
  active?: boolean;
  committedDeliveryAt?: Date;
  shippingAddressId?: string;
  parcelId?: string;
  shippingLabelId?: string;
}

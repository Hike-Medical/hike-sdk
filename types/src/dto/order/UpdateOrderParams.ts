import { OrderStatus } from '@prisma/client';

export interface UpdateOrderParams {
  status?: OrderStatus;
  active?: boolean;
  committedDeliveryAt?: Date;
  shippingAddressId?: string;
  parcelId?: string;
  shippingLabelId?: string;
}

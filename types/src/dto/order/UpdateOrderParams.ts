import { OrderStatus } from '../../../prisma/index';

export interface UpdateOrderParams {
  status?: OrderStatus;
  active?: boolean;
  committedDeliveryAt?: Date;
  shippingAddressId?: string;
  parcelId?: string;
  shippingLabelId?: string;
}

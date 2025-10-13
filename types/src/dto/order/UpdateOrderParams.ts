import { OrderStatus } from '../../../prisma';

export interface UpdateOrderParams {
  status?: OrderStatus;
  statusReason?: string;
  active?: boolean;
  committedDeliveryAt?: Date;
  shippingAddressId?: string;
  parcelId?: string;
  shippingLabelId?: string;
}

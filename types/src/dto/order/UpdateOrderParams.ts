import { OrderStatus } from '../../../prisma';

export interface UpdateOrderParams {
  status?: OrderStatus;
  comment?: string;
  statusReason?: string;
  active?: boolean;
  committedDeliveryAt?: Date;
  shippingAddressId?: string;
  parcelId?: string;
  shippingLabelId?: string;
  laneId?: string;
}

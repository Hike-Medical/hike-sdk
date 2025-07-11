import { Order, ShippingLabel } from '../../prisma';

export type OrderWithShippingLabel = Order & {
  shippingLabel?: ShippingLabel | null;
  shippingLabelId?: string | null;
};

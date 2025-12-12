import { Configuration, Machine } from '../../../prisma';

export type ShippingStationConfiguration = Configuration & {
  machines: Machine[];
};

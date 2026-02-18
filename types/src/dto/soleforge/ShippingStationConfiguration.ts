import { Configuration, Facility, Lane, Machine } from '../../../prisma';

export type ShippingStationMachine = Machine & {
  lane: (Lane & { facility: Pick<Facility, 'id' | 'name'> | null }) | null;
};

export type ShippingStationConfiguration = Configuration & {
  machines: ShippingStationMachine[];
};

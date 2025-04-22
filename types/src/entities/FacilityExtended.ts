import type { Contact, Facility } from '../../prisma/index';

export type FacilityExtended = Facility & {
  contact?: Contact | null;
  parent?: Facility | null;
};

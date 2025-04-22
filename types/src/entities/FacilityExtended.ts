import type { Contact, Facility } from '@prisma/client';

export type FacilityExtended = Facility & {
  contact?: Contact | null;
  parent?: Facility | null;
};

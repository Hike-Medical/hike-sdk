import type { Contact, Facility } from '../../prisma';

export type FacilityExtended = Facility & {
  contact?: Contact | null;
  parent?: Facility | null;
  _count?: {
    patients: number;
    evaluations: number;
  };
};

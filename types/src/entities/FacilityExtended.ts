import type { Facility, FacilityAddress } from '../../prisma';

export type FacilityExtended = Facility & {
  address?: FacilityAddress | null;
};

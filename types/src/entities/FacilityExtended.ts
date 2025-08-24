import type { Contact, Facility } from '../../prisma';
import { CompanyPreferences } from '../dto/preferences/CompanyPreferences';

export type FacilityExtended = Omit<Facility, 'preferences'> & {
  contact?: Contact | null;
  parent?: Facility | null;
  preferences: CompanyPreferences | null;
  _count?: {
    patients: number;
    evaluations: number;
  };
};

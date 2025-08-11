import { Company } from '../../prisma';
import { CompanyPreferences } from '../dto/preferences/CompanyPreferences';

export type CompanyExtended = Omit<Company, 'preferences'> & {
  preferences: CompanyPreferences | null;
};

import { Company } from '../../prisma';
import { CompanyPreferences } from '../dto/company/CompanyPreferences';

export type CompanyExtended = Omit<Company, 'preferences'> & {
  preferences: CompanyPreferences;
};

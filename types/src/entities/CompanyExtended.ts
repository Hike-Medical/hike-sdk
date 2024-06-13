import { CompanyPreferences } from '../dto/company/CompanyPreferences';
import { Company } from '../../prisma';

export type CompanyExtended = Omit<Company, 'preferences'> & {
  preferences: CompanyPreferences;
};

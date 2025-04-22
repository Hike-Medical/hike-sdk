import { Company } from '../../prisma/index';
import { CompanyPreferences } from '../dto/company/CompanyPreferences';

export type CompanyExtended = Omit<Company, 'preferences'> & {
  preferences: CompanyPreferences;
};

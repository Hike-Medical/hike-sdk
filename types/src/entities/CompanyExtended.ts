import { Company } from '@prisma/client';
import { CompanyPreferences } from '../dto/company/CompanyPreferences';

export type CompanyExtended = Omit<Company, 'preferences'> & {
  preferences: CompanyPreferences;
};

import { CompanyPreferences } from '../preferences/CompanyPreferences';

export interface AddCompanyParams {
  name: string;
  slug: string;
  preferences?: CompanyPreferences;
  enableBilling?: boolean;
}

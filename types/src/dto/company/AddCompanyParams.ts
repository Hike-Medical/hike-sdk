import { CompanyPreferences } from '../preferences/CompanyPreferences';

export interface AddCompanyParams {
  id?: string;
  name: string;
  slug: string;
  preferences?: CompanyPreferences;
  enableBilling?: boolean;
}

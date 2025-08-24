import { CompanyPreferences } from '../preferences/CompanyPreferences';

export interface UpdateCompanyParams {
  logoUrl?: string;
  url?: string;
  preferences?: CompanyPreferences;
  active?: boolean;
}

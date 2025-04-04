import { CompanyPreferences } from './CompanyPreferences';

export interface AddCompanyParams {
  name: string;
  slug: string;
  preferences?: CompanyPreferences;
}

export interface UpdateCompanyParams {
  logoUrl?: string;
  url?: string;
  preferences?: CompanyPreferences;
  active?: boolean;
}

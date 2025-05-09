import { CompanyPreferences } from './CompanyPreferences';

export interface AddCompanyParams {
  name: string;
  slug: string;
  preferences?: CompanyPreferences;
}

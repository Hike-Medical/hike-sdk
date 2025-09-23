import { CompanyPreferences } from 'dto/preferences/CompanyPreferences';
import { Company } from '../../../prisma';

export type AuthPreferences = CompanyPreferences['auth'] & {
  slug: Company['slug'];
  name: Company['name'];
  logoUrl: Company['logoUrl'];
};

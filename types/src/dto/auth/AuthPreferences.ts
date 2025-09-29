import { Company } from '../../../prisma';
import { CompanyPreferences } from '../preferences/CompanyPreferences';

export type AuthPreferences = CompanyPreferences['auth'] & {
  slug: Company['slug'];
  name: Company['name'];
  logoUrl: Company['logoUrl'];
};

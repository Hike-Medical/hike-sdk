import { Company } from '../../../prisma';
import { CompanyPreferences } from './CompanyPreferences';

export type OidcSettings = CompanyPreferences['oidc'] & Pick<Company, 'name' | 'logoUrl'>;

import type { Address } from './address';

export interface Provider {
  npi: string;
  organizationName?: string;
  firstName?: string;
  lastName?: string;
  taxonomyCode?: string;
}

export interface ProviderInfo extends Provider {
  address?: Address;
  phone?: string;
  fax?: string;
}

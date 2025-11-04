export interface Provider {
  npi: string;
  organizationName?: string;
  firstName?: string;
  lastName?: string;
  taxonomyCode?: string;
}

export interface ProviderInfo extends Provider {
  address?: {
    address1?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
  phone?: string;
  fax?: string;
}

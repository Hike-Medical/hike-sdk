export interface TransformedContact {
  name?: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  countryCode?: string;
}

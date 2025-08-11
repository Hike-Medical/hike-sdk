export interface ValidateAddressBody {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  country?: string;
}

export interface ShippingAddressBody extends ValidateAddressBody {
  phone?: string;
  name: string;
  isResidential?: boolean;
}

export interface ShipEngineValidateAddressResponse {
  status: string;
  original_address: OriginalAddress;
  matched_address: MatchedAddress;
  messages: unknown[];
}

interface OriginalAddress {
  name: string;
  phone: string;
  company_name: string;
  address_line1: string;
  address_line2: string;
  address_line3: string;
  city_locality: string;
  state_province: string;
  postal_code: number;
  country_code: string;
  address_residential_indicator: string;
}

interface MatchedAddress {
  name: string;
  phone: string;
  company_name: string;
  address_line1: string;
  address_line2: string;
  address_line3: string;
  city_locality: string;
  state_province: string;
  postal_code: string;
  country_code: string;
  address_residential_indicator: string;
}

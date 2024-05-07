export interface ValidateAddressBody {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateOrProvince: string;
  zipOrPostalCode: string;
  country: string;
}

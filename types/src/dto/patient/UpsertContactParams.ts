export interface UpsertContactParams {
  name?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  phoneNumber?: string;
}

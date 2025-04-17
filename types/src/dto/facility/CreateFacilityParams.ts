import { Carrier, FacilityType } from '../../../prisma/index';

export interface CreateFacilityParams {
  name: string;
  type: FacilityType;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  country?: string;
  shippingAccountId?: string;
  shippingAccountCarrier?: Carrier;
  phoneNumber?: string;
  parentId?: string;
}

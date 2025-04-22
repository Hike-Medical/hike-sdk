import { Carrier, FacilityType } from '../../../prisma/index';

export interface UpdateFacilityParams {
  name?: string;
  type?: FacilityType;
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
  country?: string;
  shippingAccountId?: string;
  shippingAccountCarrier?: Carrier;
  phoneNumber?: string | null;
  parentId?: string | null;
  active?: boolean;
}

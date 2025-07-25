import { FacilityType } from '../../../prisma';

export interface UpdateFacilityParams {
  name?: string;
  type?: FacilityType;
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string;
  stateOrProvince?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: string | null;
  parentId?: string | null;
  active?: boolean;
}

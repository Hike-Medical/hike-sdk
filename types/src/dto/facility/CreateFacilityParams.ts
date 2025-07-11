import { FacilityType } from '../../../prisma';

export interface CreateFacilityParams {
  name: string;
  type: FacilityType;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  country?: string;
  phoneNumber?: string;
  parentId?: string;
}

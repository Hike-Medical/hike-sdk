import { ShippingTrackingStatus } from '../../../prisma';

export interface ShippingAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  countryCode?: string;
  phoneNumber?: string;
  email?: string;
}

export interface ShipmentItem {
  workbenchId: string;
  trackingNumber: string;
  trackingStatus?: ShippingTrackingStatus;
  address?: ShippingAddress;
}

export interface CreateShipmentsParams {
  companyId: string;
  shipments: ShipmentItem[];
}

export interface ShipmentResult {
  shippingLabelId?: string;
  workbenchId: string;
  trackingNumber: string;
  success: boolean;
  error?: string;
}

export type CreateShipmentsResponse = ShipmentResult[];

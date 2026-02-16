export interface SampleKitOrderItem {
  catalogProductId: string;
  quantity: number;
}

export type SampleKitFulfillmentType = 'DIRECT_SHIP' | 'INVENTORY';

export interface SampleKitShippingAddress {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  countryCode?: string;
  phoneNumber?: string;
  email?: string;
}

export interface CreateSampleKitOrderParams {
  companyId: string;
  items: SampleKitOrderItem[];
  fulfillmentType: SampleKitFulfillmentType;
  contactId?: string;
  shippingAddress?: SampleKitShippingAddress;
  notes?: string;
}

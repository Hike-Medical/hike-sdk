import { ShippingTrackingStatus } from '../../../prisma';

/**
 * Shipping address for shipment webhook.
 * Creates a contact record when the shipment is created.
 */
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

/**
 * Parameters for creating a new shipment through the webhook.
 * This mimics the shipping station functionality for third-party fulfillment.
 */
export interface CreateShipmentParams {
  /**
   * Company ID for signature verification and association.
   */
  companyId: string;

  /**
   * Workbench ID to associate with this shipment.
   */
  workbenchId: string;

  /**
   * Tracking number provided by the carrier.
   */
  trackingNumber: string;

  /**
   * Optional label ID from the carrier's system.
   */
  labelId?: string;

  /**
   * Initial tracking status.
   * Defaults to ACCEPTED if not provided.
   */
  trackingStatus?: ShippingTrackingStatus;

  /**
   * Optional shipping address details. Creates a contact record if provided.
   */
  address?: ShippingAddress;

  /**
   * Shipping cost in cents (e.g., 599 = $5.99).
   */
  price?: number;
}

/**
 * Response from creating a shipment.
 */
export interface CreateShipmentResponse {
  shippingLabelId: string;
}

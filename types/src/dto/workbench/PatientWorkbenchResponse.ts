import { OrderAuthorizationStatus, OrderStatus, ShippingTrackingStatus } from '../../../prisma';

export interface PatientWorkbenchResponse {
  shoeGender: string | null;
  shoeSize: number | null;
  isDiabetic: boolean;
  orderStatus: OrderStatus;
  orderAuthorizationStatus: OrderAuthorizationStatus;
  submittedAt: Date;
  poNumber: string | null;
  workbenchId: string;
  trackingStatus: ShippingTrackingStatus | null;
}

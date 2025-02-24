import { Gender, OrderAuthorizationStatus, OrderStatus, ShippingTrackingStatus } from '../../../prisma';

export interface PatientWorkbenchResponse {
  shoeGender: Gender | null;
  shoeSize: number | null;
  shoeWidth: string | null;
  shoeType: string | null;
  isDiabetic: boolean;
  shippedDate: Date | null;
  contact: string | null;
  trackingStatus: ShippingTrackingStatus | null;
  orderStatus: OrderStatus | null;
  orderAuthorizationStatus: OrderAuthorizationStatus | null;
  trackingNumber: string | null;
  trackingLink: string | null;
  submittedAt: Date | null;
  createdAt: Date;
  evaluationId: string;
  workbenchId: string;
}

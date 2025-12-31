import { OrderAuthorizationStatus, OrderStatus, ShippingTrackingStatus, WorkbenchCreatedReason } from '../../../prisma';
import { InsoleSideMeasurements } from '../taika/InsoleMeasurements';

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
  cost: number;
  shoeWidth: string | null;
  shoeType: string | null;
  contact: string[] | null;
  trackingNumber: string | null;
  trackingLink: string | null;
  shippedDate: Date | null;
  leftMeasurements: InsoleSideMeasurements | null;
  rightMeasurements: InsoleSideMeasurements | null;
  evaluationId: string;
  orderFormPdfUrl?: string;
  patientFormPdfUrl?: string;
  deliveryReceiptPdfUrl?: string;
  createdReason?: WorkbenchCreatedReason | null;
}

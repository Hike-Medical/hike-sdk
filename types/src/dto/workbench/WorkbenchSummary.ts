import { RenderType } from 'dto/manufacturing/RenderType';
import { OrderStatus, ShippingTrackingStatus, WorkbenchCreatedReason } from '../../../prisma';

export interface WorkbenchSummary {
  id: string;
  patientName: string;
  externalId: string | null;
  poNumber: string | null;
  startedAt: Date;
  submittedAt: Date | null;
  trackingStatus: ShippingTrackingStatus | null;
  labelId: string | null;
  taikaId: string | null;
  devTaikaId: string | null;
  orderStatus: OrderStatus | null;
  authorizationDate: Date | null;
  clinicians: string[];
  orderPdfUrlExists: boolean;
  evaluationPdfUrlExists: boolean;
  orderSide: RenderType | null;
  orderQuantity: string | null;
  createdReason: WorkbenchCreatedReason | null;
  orderShoeSize: string | null;
}

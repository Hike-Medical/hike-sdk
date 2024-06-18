import { OrderStatus } from '../../../prisma';

export interface AggregatedWorkbenchResponse {
  workbenchId: string;
  companyId: string;
  evaluationId: string;
  patientId: string;
  orderId?: string | null;
  orderStatus?: OrderStatus | null;
  poNumber?: string | null;
  clinicianName?: string | null;
  clinicianId?: string | null;
  patientFirstName?: string | null;
  patientLastName?: string | null;
  orderCreatedAt?: Date | null;
  authorizationUpdatedAt?: Date | null;
  orderCompletedAt?: Date | null;
  isDiabetic?: boolean | null;
  orderSide?: number | null;
  orderQuantity?: string | null;
  orderShoeSize?: string | null;
  grindingCompletedAt?: Date | null;
  grindingCompletedBy?: string | null;
  gluingCompletedAt?: Date | null;
  gluingCompletedBy?: string | null;
  finishingCompletedAt?: Date | null;
  finishingCompletedBy?: string | null;
  shippingCompletedAt?: Date | null;
  shippingCompletedBy?: string | null;
  printingCompletedAt?: Date | null;
  printingCompletedBy?: string | null;
  addonCompletedAt?: Date | null;
  addonCompletedBy?: string | null;
  validationStatus?: boolean | null;
  deviceTypeName?: string | null;
  taikaId?: string | null;
  taikaDevId?: string | null;
}

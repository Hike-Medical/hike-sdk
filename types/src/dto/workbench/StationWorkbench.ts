import { OrderStatus, ProductType } from '../../../prisma';

export interface StationWorkbench {
  workbenchId: string;
  authorizationUpdatedAt: Date | null;
  evaluationId: string | null;
  patientId: string | null;
  orderId: string | null;
  companySlug: string | null;
  productType: ProductType | null;
  poNumber: string | null;
  status: OrderStatus | null;
  orderCompletedAt: Date | null;
  quantity: string | null;
  printingCompletedAt?: Date | null;
  printingCompletedBy?: string | null;
  grindingCompletedAt?: Date | null;
  grindingCompletedBy?: string | null;
  gluingCompletedAt?: Date | null;
  gluingCompletedBy?: string | null;
  finishingCompletedAt?: Date | null;
  finishingCompletedBy?: string | null;
  shippingCompletedAt?: Date | null;
  shippingCompletedBy?: string | null;
}

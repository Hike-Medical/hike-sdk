import { ProductType, WorkbenchStatus } from '../../../prisma';

export interface ManufacturingWorkbench {
  workbenchId: string;
  externalId: string | null;
  isDiabetic: boolean;
  isReprint: boolean;
  authorizationUpdatedAt: Date | null;
  patientFirstName: string;
  patientLastName: string;
  evaluationId: string;
  patientId: string;
  orderId: string;
  companySlug: string;
  productType: ProductType;
  poNumber: string | null;
  status: WorkbenchStatus;
  orderAuthorizationStatus: string;
  committedDeliveryAt: Date | null;
  orderCreatedAt: Date | null;
  orderPdfUrlExists: boolean;
  evaluationPdfUrlExists: boolean;
  clinicianName: string | null;
  orderQuantity: string | null;
  orderShoeWidth: string;
  orderShoeSize: string;
  orderGender: string;
  orderSide: number | null;
  taikaId: string | null;
  rushedAt: Date | null;
  printingCompletedAt: Date | null;
  printingCompletedBy: string | null;
  grindingCompletedAt: Date | null;
  grindingCompletedBy: string | null;
  gluingCompletedAt: Date | null;
  gluingCompletedBy: string | null;
  addonCompletedAt: Date | null;
  addonCompletedBy: string | null;
}

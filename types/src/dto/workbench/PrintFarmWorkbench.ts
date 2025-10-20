import { ProductType, WorkbenchStatus } from '../../../prisma';

export interface PrintFarmWorkbench {
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
  clinicianName: string | null;
  orderQuantity: string;
  orderShoeWidth: string;
  orderShoeSize: string;
  orderGender: string;
  orderSide: number | null;
  slicerProfile?: string | null;
  isOutsideClinic?: boolean;
}

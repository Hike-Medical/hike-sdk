import { FormSubmissionTyped } from 'forms/FormSubmissionTyped';
import { OrderAuthorizationStatus, OrderStatus, ProductType } from '../../../prisma';
import { FormSchemaTyped } from 'forms/FormSchemaTyped';

export interface StationWorkbench {
  workbenchId: string;
  externalId: string | null;
  authorizationUpdatedAt: Date | null;
  patientFirstName: string | null;
  patientLastName: string | null;
  evaluationId: string | null;
  patientId: string | null;
  orderId: string | null;
  companySlug: string | null;
  productType: ProductType | null;
  poNumber: string | null;
  status: OrderStatus | null;
  orderAuthorizationStatus: OrderAuthorizationStatus | null;
  committedDeliveryAt: Date | null;
  orderCompletedAt: Date | null;
  quantity: string | null;
  addonCompletedAt?: Date | null;
  addonCompletedBy?: string | null;
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
  formSubmissions?: (FormSubmissionTyped & { schema?: FormSchemaTyped })[];
}

import { FormSchemaTyped } from 'forms/FormSchemaTyped';
import { FormSubmissionTyped } from 'forms/FormSubmissionTyped';
import { OrderAuthorizationStatus, OrderStatus, Prisma, ProductType } from '../../../prisma';
import { WorkbenchPdfUrls } from '../../entities/WorkbenchExtended';

export interface StationWorkbench extends WorkbenchPdfUrls {
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
  destinationFacilityId?: string | null;
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
  qualityControlCompletedAt?: Date | null;
  qualityControlCompletedBy?: string | null;
  shippingCompletedAt?: Date | null;
  shippingCompletedBy?: string | null;
  rushedAt?: Date | null;
  isOutsideClinic?: boolean;
  isRejected?: boolean;
  shippingAddress?: string | null;
  formSubmissions?: (FormSubmissionTyped & { schema?: FormSchemaTyped })[];
}

export type WorkbenchWithRelations = Prisma.WorkbenchGetPayload<{
  include: {
    evaluation: {
      select: {
        id: true;
        poNumber: true;
        company: { select: { slug: true } };
      };
    };
    patient: {
      include: {
        companies: {
          select: {
            externalId: true;
            contact: {
              select: {
                addressLine1: true;
                addressLine2: true;
                city: true;
                stateOrProvince: true;
                postalCode: true;
              };
            };
          };
          take: 1;
        };
      };
    };
    product: { select: { type: true } };
    formSubmissions: { include: { schema: true } };
  };
}>;

export type OrderSlim = Prisma.OrderGetPayload<{
  select: {
    id: true;
    status: true;
    completedAt: true;
    committedDeliveryAt: true;
    authorizationUpdatedAt: true;
    authorizationStatus: true;
    destinationFacilityId: true;
  };
}>;

export type StationWorkbenchOrderBy =
  | 'completedAt'
  | 'authorizationUpdatedAt'
  | 'printingCompletedAt'
  | 'grindingCompletedAt'
  | 'gluingCompletedAt'
  | 'finishingCompletedAt'
  | 'qualityControlCompletedAt'
  | 'shippingCompletedAt'
  | 'addonCompletedAt';

export type WorkbenchSubmissionsFilter = [string, string] | [string, string[]];

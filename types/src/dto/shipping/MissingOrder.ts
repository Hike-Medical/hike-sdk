export interface MissingOrder {
  orderId: string;
  workbenchId: string;
  poNumber: string | null;
  companyId: string;
  companySlug: string | null;
  patientFirstName: string | null;
  patientLastName: string | null;
  productType: string | null;
  facilityId: string | null;
  facilityName: string | null;
  missingAt: string;
  committedDeliveryAt: string | null;
}

export type MissingOrdersResponse = MissingOrder[];

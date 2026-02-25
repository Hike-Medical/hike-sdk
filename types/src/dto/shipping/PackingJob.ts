export interface PackingJobOrder {
  orderId: string;
  workbenchId: string;
  poNumber: string | null;
  companyId: string;
  companySlug: string | null;
  patientFirstName: string | null;
  patientLastName: string | null;
  productType: string | null;
  leftQuantity: string | null;
  rightQuantity: string | null;
  committedDeliveryAt: string | null;
}

export interface PackingJob {
  facilityId: string;
  facilityName: string;
  shipFromFacilityId: string | null;
  shipFromFacilityName: string | null;
  orders: PackingJobOrder[];
  totalOrders: number;
  earliestCommitDate: string | null;
  hasShippingContact: boolean;
}

export type PackingJobsResponse = PackingJob[];

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
}

export interface PackingJob {
  facilityId: string;
  facilityName: string;
  orders: PackingJobOrder[];
  totalOrders: number;
}

export type PackingJobsResponse = PackingJob[];

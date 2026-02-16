import type { OrderStatus } from '../../../prisma';

export interface CatalogOrderResponse {
  id: string;
  workbenchId: string;
  orderId: string;
  evaluationId: string;
  companyId: string;
  companyName: string;
  patientId: string;
  patientName: string;
  catalogProductId: string;
  catalogProductSku: string;
  catalogProductName: string;
  formSchemaId?: string;
  formData?: Record<string, unknown>;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCatalogOrderResponse {
  evaluationId: string;
  orders: CatalogOrderResponse[];
}

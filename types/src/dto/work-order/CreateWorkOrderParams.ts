import type { AppId } from '../../config/AppId';

export interface CreateWorkOrderParams {
  catalogProductId: string;
  quantity: number;
  appId: AppId;
  patientId?: string;
  productType?: string;
  poNumber?: string;
  type?: string;
}

export interface WorkOrderResult {
  evaluationId: string;
  workbenchId: string;
  orderId: string;
  quantity: number;
}

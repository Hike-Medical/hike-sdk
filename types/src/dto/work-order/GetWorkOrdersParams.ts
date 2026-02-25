export interface GetWorkOrdersParams {
  offset?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface WorkOrderListItem {
  id: string;
  evaluationId: string;
  workbenchId: string;
  poNumber: string | null;
  status: string;
  workbenchStatus: string;
  committedDeliveryAt: string | null;
  createdAt: string;
}

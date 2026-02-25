export interface GetWorkOrdersParams {
  offset?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: Partial<Record<string, string>>;
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

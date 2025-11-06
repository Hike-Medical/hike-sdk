export interface WorkflowSearchResult {
  id: string;
  name: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  endTime?: Date;
  status: string;
  statusReason?: string;
  statusUpdates: {
    status: string;
    updatedAt: Date;
  }[];
  errorCount: number;
  errorTypes: string[];
  facts?: Record<string, { value: unknown }>;
}

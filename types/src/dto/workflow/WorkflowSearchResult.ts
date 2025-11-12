export interface WorkflowSearchResult {
  id: string;
  name: string;
  companyId: string;
  startTime: Date;
  updatedTime: Date;
  endTime?: Date;
  expirationTime?: Date;
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

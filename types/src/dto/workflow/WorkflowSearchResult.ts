export interface WorkflowSearchResult {
  id: string;
  name: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  statusUpdates: {
    status: string;
    updatedAt: Date;
  }[];
  errorCount: number;
  errorTypes: string[];
}

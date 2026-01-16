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
  latestComment?: {
    content: string;
    createdAt: Date;
    createdBy?: {
      id: string;
      firstName?: string;
      lastName?: string;
      email?: string;
    };
  };
  statusUpdates: {
    status: string;
    updatedAt: Date;
  }[];
  errorCount: number;
  errorTypes: string[];
  facts?: Record<string, { value: unknown }>;
  tags?: string[];
}

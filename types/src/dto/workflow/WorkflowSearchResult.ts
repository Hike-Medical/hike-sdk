import { WorkflowStatus } from '../../../prisma';

export interface WorkflowSearchResult {
  id: string;
  name: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  statusUpdates: {
    status: WorkflowStatus;
    updatedAt: Date;
  }[];
}

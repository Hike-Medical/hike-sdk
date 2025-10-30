import { TaskStatus } from '../../../prisma';

export type TaskSortBy = 'createdDate' | 'lastUpdate' | 'status' | 'priority';
export type TaskSortOrder = 'asc' | 'desc';

export interface SearchTasksParams {
  assignedUserId?: string;
  assignedTeamId?: string;
  companyId?: string;
  status?: TaskStatus;
  workflowId?: string;
  sortBy?: TaskSortBy;
  sortOrder?: TaskSortOrder;
  limit?: number;
  offset?: number;
}


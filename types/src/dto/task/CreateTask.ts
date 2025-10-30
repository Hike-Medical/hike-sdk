export interface CreateTaskBody {
  workflowId?: string;
  name: string;
  description?: string;
  priority?: number;
  assignedUserId?: string;
  assignedTeamId?: string;
}


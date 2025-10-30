import { TaskStatus } from '../../../prisma';

export interface UpdateTaskBody {
  status?: TaskStatus;
  priority?: number;
  assignedUserId?: string;
  assignedTeamId?: string;
  notes?: string;
  changeReason?: string;
}


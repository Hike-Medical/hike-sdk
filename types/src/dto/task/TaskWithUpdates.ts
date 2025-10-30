import { Task, TaskUpdate } from '../../../prisma';

export interface TaskWithUpdates extends Task {
  updates: TaskUpdate[];
}


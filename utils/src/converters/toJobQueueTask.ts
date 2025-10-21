import { JobQueueTask } from '@hike/types';

interface JobQueueTaskDto {
  id: string;
  name: string;
  data: unknown;
  progress: number;
  delay: number;
  failedReason?: string;
  stacktrace?: string[];
  returnvalue: unknown;
  finishedOn?: number | null;
  processedOn?: number | null;
}

export const toJobQueueTask = <T, U>(task: JobQueueTaskDto): JobQueueTask<T, U> | null => ({
  id: task.id,
  name: task.name,
  data: task.data as T,
  progress: task.progress ?? 0,
  delay: task.delay,
  error: task.failedReason ?? task.stacktrace?.[0] ?? null,
  returnValue: task.returnvalue as U,
  startedAt: task.processedOn != null ? new Date(task.processedOn) : undefined,
  finishedAt: task.finishedOn != null ? new Date(task.finishedOn) : undefined
});

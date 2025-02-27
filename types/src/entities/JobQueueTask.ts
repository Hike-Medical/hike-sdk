export interface JobQueueTask<T, U> {
  id: string;
  name: string;
  data: T;
  progress: number;
  delay: number;
  error: string | null;
  returnValue: U | null;
  startedAt?: Date | null;
  finishedAt?: Date | null;
}

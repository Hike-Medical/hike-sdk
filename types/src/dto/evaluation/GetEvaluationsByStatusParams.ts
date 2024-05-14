import type { PagedParams } from '../PagedParams';

export type EvaluationStatus =
  | 'NOT_STARTED'
  | 'CANCELLED'
  | 'INCOMPLETE'
  | 'AWAITING_AUTH'
  | 'PROCESSING'
  | 'COMPLETED';

export interface GetEvaluationsByStatusParams extends PagedParams {
  status?: EvaluationStatus;
  searchQuery?: string;
  primaryPractitioner?: string;
  location?: string;
  sortBy?: 'appointmentAt';
}

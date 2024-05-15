import type { PagedParams } from '../PagedParams';

export type EvaluationStatus =
  | 'NOT_STARTED'
  | 'CANCELLED'
  | 'INCOMPLETE'
  | 'AWAITING_AUTH'
  | 'PROCESSING'
  | 'COMPLETED';

export interface GetEvaluationsByStatusParams extends PagedParams {
  status: EvaluationStatus;
  searchQuery?: string;
  clinicianId?: string;
  userId?: string;
  facilityId?: string;
  sortBy?: 'appointmentAt';
}

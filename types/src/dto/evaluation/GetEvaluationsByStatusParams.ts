import type { PagedParams } from '../PagedParams';

export type EvaluationStatus = 'UPCOMING' | 'IN_PROGRESS' | 'INCOMPLETE' | 'COMPLETED';

export interface GetEvaluationsByStatusParams extends PagedParams {
  status: EvaluationStatus;
  searchQuery?: string;
  practitioner?: string;
  facilityId?: string;
  sortBy?: 'appointmentAt';
}

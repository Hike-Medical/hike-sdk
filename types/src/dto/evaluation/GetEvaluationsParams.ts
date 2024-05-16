import { Evaluation } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export type EvaluationStatus =
  | 'NOT_STARTED'
  | 'CANCELLED'
  | 'INCOMPLETE'
  | 'AWAITING_AUTH'
  | 'PROCESSING'
  | 'COMPLETED';

export interface GetEvaluationsParams extends PagedParams {
  statuses?: EvaluationStatus[];
  searchQuery?: string;
  clinicianId?: string;
  facilityId?: string;
  visitTypes?: string[];
  excludedVisitTypes?: string[];
  appointmentStatuses?: string[];
  excludedAppointmentStatuses?: string[];
  sortBy?: keyof Evaluation;
}

import type { CareType } from '../../../prisma';
import type { PagedParams } from '../PagedParams';
import type { EvaluationStatus } from './GetEvaluationsByStatusParams';

export interface SearchEvaluationsParams extends PagedParams {
  patientId?: string;
  patientExternalId?: string;
  evaluationStatus?: EvaluationStatus;
  careType?: CareType;
  appointmentStartAt?: Date;
  assignedOnly?: boolean;
  appointmentEndAt?: Date;
  appointmentStatus?: string;
  clinicianId?: string;
  visitTypeId?: string;
  facilityId?: string;
  sortBy?: 'appointmentAt';
}

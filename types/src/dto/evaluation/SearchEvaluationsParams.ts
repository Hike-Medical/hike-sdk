import type { CareType } from '../../../prisma';
import type { PagedParams } from '../PagedParams';
import type { EvaluationStatus } from './GetEvaluationsParams';

export interface SearchEvaluationsParams extends PagedParams {
  patientId?: string;
  patientExternalId?: string;
  evaluationStatus?: EvaluationStatus;
  careType?: CareType;
  appointmentStartAt?: Date;
  appointmentEndAt?: Date;
  appointmentStatus?: string;
  clinicianId?: string;
  visitTypeId?: string;
  facilityId?: string;
  assignedOnly?: boolean;
}

import type { CareType } from '../../../prisma';
import type { PagedParams } from '../PagedParams';
import type { EvaluationStatus } from './GetEvaluationsByStatusParams';

export interface SearchEvaluationsParams extends PagedParams {
  patientId?: string;
  patientExternalId?: string;
  evaluationStatus?: EvaluationStatus;
  careType?: CareType;
  appointmentStartAt?: Date;
  appointmentEndAt?: Date;
  appointmentStatus?: string;
  primaryPractitioner?: string;
  visitTypeId?: string;
  location?: string;
  sortBy?: 'appointmentAt';
}

import type { CareType } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface SearchEvaluationsParams extends PagedParams {
  patientId?: string;
  patientExternalId?: string;
  externalId?: string;
  careType?: CareType;
  appointmentStartAt?: Date;
  appointmentEndAt?: Date;
  appointmentStatus?: string;
  primaryPractitioner?: string;
  visitTypeId?: string;
  location?: string;
  sortBy?: 'appointmentAt';
}

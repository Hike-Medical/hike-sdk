import type { CareType } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface SearchEvaluationsParams extends PagedParams {
  patientId?: string;
  patientExternalId?: string;
  careType?: CareType;
  appointmentStartAt?: Date;
  appointmentEndAt?: Date;
  appointmentStatus?: string;
  practitioner?: string;
  visitTypeId?: string;
  facilityId?: string;
  sortBy?: 'appointmentAt';
}

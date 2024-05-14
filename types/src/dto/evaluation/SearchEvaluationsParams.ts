import type { CareType } from '../../../prisma';
import type { PagedParams } from '../PagedParams';

export interface SearchEvaluationsParams extends PagedParams {
  patientId?: string;
  patientExternalId?: string;
  careType?: CareType;
  appointmentStartAt?: Date;
  appointmentEndAt?: Date;
  appointmentStatus?: string;
  clinicianId?: string;
  visitTypeId?: string;
  facilityId?: string;
  sortBy?: 'appointmentAt';
}

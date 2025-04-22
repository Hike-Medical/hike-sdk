import { CareType, ProductType } from '../../../prisma/index';
import type { PagedParams } from '../PagedParams';
import type { EvaluationStatus } from './EvaluationStatus';

export interface GetEvaluationsParams extends PagedParams {
  searchQuery?: string;
  statuses?: EvaluationStatus[];
  careType?: CareType;
  poNumber?: string;
  patientId?: string;
  patientExternalId?: string;
  clinicianId?: string;
  facilityId?: string;
  productTypes?: ProductType[];
  visitTypes?: string[];
  visitTypeId?: string;
  appointmentStartAt?: Date;
  appointmentEndAt?: Date;
  excludedVisitTypes?: string[];
  appointmentStatuses?: string[];
  excludedAppointmentStatuses?: string[];
  assignedOnly?: boolean;
}

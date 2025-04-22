import type { CareType, ProductType } from '../../../prisma/index';
import type { PagedParams } from '../PagedParams';
import type { EvaluationStatus } from './EvaluationStatus';

export interface SearchEvaluationsParams extends PagedParams {
  patientId?: string;
  patientExternalId?: string;
  status?: EvaluationStatus;
  careType?: CareType;
  appointmentStartAt?: Date;
  appointmentEndAt?: Date;
  appointmentStatus?: string;
  clinicianId?: string;
  visitTypeId?: string;
  facilityId?: string;
  productTypes?: ProductType[];
  assignedOnly?: boolean;
}

import { CareType, Side, VerticalPosition } from '../../../prisma';
/**
 * Data transfer object for creating an evaluation.
 */
export interface CreateEvaluationParams {
  externalId?: string;
  poNumber?: string;
  type: CareType;
  patientId: string;
  deviceTypeId?: string;
  isDiabetic?: boolean;
  deviceSide?: Side;
  devicePosition?: VerticalPosition;
  appointmentAt?: Date;
  appointmentStatus?: string;
  clinicianIds?: string[];
  referringPhysicianId?: string;
  diagnosisId?: string;
  diagnosisedAt?: Date;
  visitTypeId?: string;
  visitedAt?: Date;
  facilityId?: string;
  location?: string;
  prescribedAt?: Date;
  prescribedActive?: boolean;
  notes?: string;
  workbenchId?: string;
  completedAt?: Date;
  cancelledAt?: Date;
}

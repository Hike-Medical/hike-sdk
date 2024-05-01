import { CareType, Side, VerticalPosition } from '../../../prisma';

/**
 * Data transfer object for creating an evaluation.
 */
export interface CreateEvaluationParams {
  externalId?: string;
  type: CareType;
  patientId: string;
  deviceTypeId?: string;
  isDiabetic?: boolean;
  deviceSide?: Side;
  devicePosition?: VerticalPosition;
  appointmentAt?: Date;
  appointmentStatus?: string;
  primaryPractitioner?: string;
  referringPhysicianId?: string;
  diagnosisId?: string;
  diagnosisedAt?: Date;
  visitInformation?: unknown;
  visitTypeId?: string;
  visitedAt?: Date;
  location?: string;
  prescribedPractitioner?: string;
  prescribedAt?: Date;
  prescribedActive?: boolean;
  notes?: string;
  questionnaire?: unknown;
  workbenchId?: string;
  completedAt?: Date;
  cancelledAt?: Date;
}

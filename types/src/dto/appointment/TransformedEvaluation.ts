import { CareType, Gender, Side, VerticalPosition } from '../../../prisma';

/**
 * Represents a transformed record from an uploaded report.
 */
export interface TransformedEvaluation {
  externalPatientId: string;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  gender?: Gender | null;
  birthDate?: Date | null;
  externalEvaluationId: string;
  careType: CareType;
  deviceType?: string | null;
  deviceSide?: Side | null;
  devicePosition?: VerticalPosition | null;
  appointmentAt?: Date | null;
  appointmentStatus?: string | null;
  clinicians?: string[];
  referringPhysician?: string | null;
  referringPhysicianNpi?: string | null;
  primaryPhysician?: string | null;
  primaryPhysicianNpi?: string | null;
  diagnosisCode?: string | null;
  diagnosisAt?: Date | null;
  visitType?: string | null;
  visitedAt?: Date | null;
  facility?: string | null;
  location?: string | null;
  prescribedAt?: Date | null;
  prescribedActive?: boolean;
  primaryInsurance?: string | null;
  secondaryInsurance?: string | null;
  notes?: string | null;
}

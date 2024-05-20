import type {
  Clinician,
  DeviceType,
  Diagnosis,
  Evaluation,
  Facility,
  Physician,
  VisitType,
  Workbench
} from '../../prisma';
import { EvaluationStatus } from '../dto/evaluation/EvaluationStatus';
import { PatientExtended } from './PatientExtended';

export type EvaluationExtended = Evaluation & {
  patient: PatientExtended;
  workbench?: Workbench;
  deviceType: DeviceType | null;
  visitType?: VisitType | null;
  diagnosis?: Diagnosis | null;
  referringPhysician?: Physician | null;
  facility?: Facility | null;
  clinicians: Clinician[];
  evaluationStatus?: EvaluationStatus;
  authorizedAt?: Date | null;
  completedAt?: Date | null;
};

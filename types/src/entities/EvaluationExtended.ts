import type { Clinician, DeviceType, Diagnosis, Evaluation, Facility, Physician, VisitType } from '../../prisma';
import { EvaluationStatus } from '../dto/evaluation/GetEvaluationsByStatusParams';
import { PatientExtended } from './PatientExtended';

export type EvaluationExtended = Evaluation & {
  patient: PatientExtended;
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

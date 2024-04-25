import type { DeviceType, Diagnosis, Evaluation, Patient, Physician, VisitType } from '../../prisma';

export type EvaluationExtended = Evaluation & {
  patient: Patient;
  deviceType: DeviceType | null;
  visitType?: VisitType | null;
  diagnosis?: Diagnosis | null;
  referringPhysician?: Physician | null;
};

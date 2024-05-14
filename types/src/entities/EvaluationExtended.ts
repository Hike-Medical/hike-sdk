import type { DeviceType, Diagnosis, Evaluation, Facility, Patient, Physician, VisitType } from '../../prisma';

export type EvaluationExtended = Evaluation & {
  patient: Patient;
  deviceType: DeviceType | null;
  visitType?: VisitType | null;
  diagnosis?: Diagnosis | null;
  referringPhysician?: Physician | null;
  facility?: Facility | null;
};

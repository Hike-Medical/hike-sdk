import type {
  Clinician,
  CompanyPatient,
  DeviceType,
  Diagnosis,
  Evaluation,
  Facility,
  Order,
  Patient,
  Physician,
  VisitType,
  Workbench
} from '../../prisma';
import { EvaluationStatus } from '../dto/evaluation/EvaluationStatus';

export type EvaluationExtended = Evaluation & {
  patient: Patient & { companies?: CompanyPatient[] };
  workbenches?: (Workbench & { orders?: Order[] | null })[] | null;
  deviceType?: DeviceType | null;
  visitType?: VisitType | null;
  diagnosis?: Diagnosis | null;
  referringPhysician?: Physician | null;
  facility?: Facility | null;
  clinicians?: Clinician[] | null;
  status?: EvaluationStatus;
  authorizedAt?: Date | null;
  completedAt?: Date | null;
};

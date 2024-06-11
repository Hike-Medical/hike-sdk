import type {
  Clinician,
  CompanyPatient,
  DeviceType,
  Diagnosis,
  Evaluation,
  Order,
  Patient,
  Physician,
  VisitType,
  Workbench
} from '../../prisma';
import { EvaluationStatus } from '../dto/evaluation/EvaluationStatus';
import { FacilityExtended } from './FacilityExtended';

export type EvaluationExtended = Evaluation & {
  patient: Patient & { companies?: CompanyPatient[] };
  workbenches?: (Workbench & { orders?: Order[] | null })[] | null;
  deviceType?: DeviceType | null;
  visitType?: VisitType | null;
  diagnosis?: Diagnosis | null;
  referringPhysician?: Physician | null;
  facility?: FacilityExtended | null;
  clinicians?: Clinician[] | null;
  status?: EvaluationStatus;
  authorizedAt?: Date | null;
  completedAt?: Date | null;
};

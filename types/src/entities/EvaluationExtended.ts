import type {
  Clinician,
  CompanyPatient,
  DeviceType,
  Diagnosis,
  Evaluation,
  Order,
  Patient,
  Physician,
  Product,
  ShippingLabel,
  VisitType,
  Workbench
} from '../../prisma';
import { EvaluationStatus } from '../dto/evaluation/EvaluationStatus';
import { EvaluationAttachmentExtended } from './EvaluationAttachmentExtended';
import { FacilityExtended } from './FacilityExtended';

export type EvaluationExtended = Evaluation & {
  patient: Patient & { companies?: CompanyPatient[]; primaryPhysician?: Physician };
  workbenches?:
    | (Workbench & { product?: Product | null; orders?: (Order & { shippingLabel?: ShippingLabel | null })[] | null })[]
    | null;
  deviceType?: DeviceType | null;
  visitType?: VisitType | null;
  diagnosis?: Diagnosis | null;
  referringPhysician?: Physician | null;
  facility?: FacilityExtended | null;
  clinicians?: Clinician[] | null;
  status?: EvaluationStatus;
  authorizedAt?: Date | null;
  completedAt?: Date | null;
  attachments: EvaluationAttachmentExtended[];
};

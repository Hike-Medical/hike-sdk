import type { Asset, Evaluation, Product, Workbench, WorkbenchNotes } from '../../prisma';
import { WorkbenchCustomization } from '../dto/workbench/WorkbenchCustomization';
import { FormSubmissionExtended } from '../forms/FormSubmissionExtended';
import { EvaluationExtended } from './EvaluationExtended';
import { OrderWithShippingLabel } from './OrderWithShippingLabel';
import { PatientExtended } from './PatientExtended';

export interface WorkbenchPdfUrls {
  orderFormPdfUrl?: string;
  patientFormPdfUrl?: string;
  deliveryReceiptPdfUrl?: string;
}

export type WorkbenchExtended = Workbench & {
  patient: PatientExtended;
  product: Product;
  evaluation: Pick<EvaluationExtended, 'clinicians'> & Evaluation;
  orders?: OrderWithShippingLabel[];
  assets: Asset[];
  formSubmissions: FormSubmissionExtended[];
  notes: WorkbenchNotes[];
  customization: WorkbenchCustomization | null;
} & WorkbenchPdfUrls;

import { CustomizationResponse } from 'dto/workbench/CustomizationResponse';
import type { Asset, Evaluation, Order, Product, ShippingLabel, Workbench, WorkbenchNotes } from '../../prisma';
import { FormSubmissionExtended } from '../forms/FormSubmissionExtended';
import { EvaluationExtended } from './EvaluationExtended';
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
  orders?: (Order & { shippingLabel?: ShippingLabel })[];
  assets: Asset[];
  formSubmissions: FormSubmissionExtended[];
  notes: WorkbenchNotes[];
  customization: CustomizationResponse;
} & WorkbenchPdfUrls;

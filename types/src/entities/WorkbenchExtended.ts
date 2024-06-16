import { CustomizationResponse } from 'dto/workbench/CustomizationResponse';
import type { Asset, Evaluation, Order, Patient, Product, Workbench, WorkbenchNotes } from '../../prisma';
import { FormSubmissionExtended } from '../forms/FormSubmissionExtended';
import { EvaluationExtended } from './EvaluationExtended';

export type WorkbenchExtended = Workbench & {
  patient: Patient;
  product: Product;
  evaluation: Pick<EvaluationExtended, 'clinicians'> & Evaluation;
  orders: Order[];
  assets: Asset[];
  formSubmissions: FormSubmissionExtended[];
  notes: WorkbenchNotes[];
  customization: CustomizationResponse;
};

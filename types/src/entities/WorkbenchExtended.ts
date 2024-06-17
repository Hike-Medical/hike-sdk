import { CustomizationResponse } from 'dto/workbench/CustomizationResponse';
import type { Asset, Evaluation, Order, Product, Workbench, WorkbenchNotes } from '../../prisma';
import { FormSubmissionExtended } from '../forms/FormSubmissionExtended';
import { EvaluationExtended } from './EvaluationExtended';
import { PatientExtended } from './PatientExtended';

export type WorkbenchExtended = Workbench & {
  patient: PatientExtended;
  product: Product;
  evaluation: Pick<EvaluationExtended, 'clinicians'> & Evaluation;
  orders: Order[];
  assets: Asset[];
  formSubmissions: FormSubmissionExtended[];
  notes: WorkbenchNotes[];
  customization: CustomizationResponse;
};

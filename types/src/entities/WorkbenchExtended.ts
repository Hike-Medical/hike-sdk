import type { Asset, Evaluation, Order, Patient, Product, Workbench, WorkbenchNotes } from '../../prisma';
import { FormSubmissionExtended } from '../forms/FormSubmissionExtended';

export type WorkbenchExtended = Workbench & {
  patient: Patient;
  product: Product;
  evaluation: Evaluation;
  orders: Order[];
  assets: Asset[];
  formSubmissions: FormSubmissionExtended[];
  notes: WorkbenchNotes[];
};

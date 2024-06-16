import type { Asset, Evaluation, Order, Product, Workbench, WorkbenchNotes } from '../../prisma';
import { FormSubmissionExtended } from '../forms/FormSubmissionExtended';
import { PatientExtended } from './PatientExtended';

export type WorkbenchExtended = Workbench & {
  patient: PatientExtended;
  product: Product;
  evaluation: Evaluation;
  orders: Order[];
  assets: Asset[];
  formSubmissions: FormSubmissionExtended[];
  notes: WorkbenchNotes[];
};

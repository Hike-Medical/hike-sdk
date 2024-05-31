import type {
  Asset,
  Evaluation,
  FormSubmission,
  Order,
  Patient,
  Product,
  Workbench,
  WorkbenchNotes
} from '../../prisma';

export type WorkbenchExtended = Workbench & {
  patient: Patient;
  product: Product;
  evaluation: Evaluation;
  orders: Order[];
  assets: Asset[];
  formSubmissions: FormSubmission[];
  notes: WorkbenchNotes[];
};

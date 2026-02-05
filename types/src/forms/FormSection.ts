import { FormField, FormFieldValue } from './FormField';
import { FormRule } from './FormRule';

export interface FormSection {
  id?: string;
  title: string;
  description?: string;
  badge?: string;
  fields: FormField[];
  meta?: Record<string, FormFieldValue>;
  rule?: FormRule | FormRule[];
  required?: boolean;
  disabled?: boolean;
  ui?: 'accordion' | 'accordion:toggle';
  route?: string;
}

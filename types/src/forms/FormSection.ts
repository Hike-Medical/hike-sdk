import { FormField, FormFieldValue } from './FormField';
import { FormRule } from './FormRule';

export interface FormSection {
  title: string;
  description?: string;
  badge?: string;
  fields: FormField[];
  meta?: Record<string, FormFieldValue>;
  rule?: FormRule;
  required?: boolean;
  disabled?: boolean;
  ui?: 'accordion' | 'accordion:toggle';
}

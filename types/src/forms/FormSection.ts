import { FormField } from './FormField';
import { FormRule } from './FormRule';

export interface FormSection {
  title: string;
  description?: string;
  badge?: string;
  fields: FormField[];
  meta?: Record<string, string>;
  rule?: FormRule;
}

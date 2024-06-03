import { FormFieldValue } from './FormField';

export interface FormRule {
  effect: 'show' | 'hide' | 'enable' | 'disable';
  condition: { name: string; value: FormFieldValue };
}

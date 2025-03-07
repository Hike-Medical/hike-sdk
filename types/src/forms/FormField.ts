import { FieldPrint } from './FieldPrint';
import { FormRule } from './FormRule';

export type FormFieldValue = string | string[] | number | number[] | boolean | null | undefined;

interface BaseFormField<T extends FormFieldValue> {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  print?: boolean | Record<string, FieldPrint>;
  default?: T;
  dbField?: { table: string; column: string; unique?: string[] };
  rule?: FormRule;
  templateable?: boolean;
  meta?: Record<string, FormFieldValue>;
}

export interface FormFieldOption {
  label: string;
  value: string;
  description?: string;
  icon?: string;
  alias?: Record<string, FormFieldValue>;
}

export type FormField =
  | (BaseFormField<string> & {
      type: 'text';
      suffix?: string;
      keyboard?: 'email' | 'url' | 'phone' | 'punctuation';
      hidden?: boolean;
    })
  | (BaseFormField<number> & {
      type: 'number';
      suffix?: string;
      keyboard?: 'numeric' | 'decimal';
      min?: number;
      max?: number;
    })
  | (BaseFormField<boolean> & { type: 'boolean'; ui?: 'toggle' | 'radio' })
  | (BaseFormField<string> & { type: 'date'; mode?: 'date' | 'datetime' | 'time'; min?: string; max?: string })
  | (BaseFormField<string> & { type: 'address' })
  | (BaseFormField<string[]> & { type: 'image'; multiple?: boolean })
  | (BaseFormField<string[]> & { type: 'file'; multiple?: boolean })
  | (BaseFormField<string[]> & { type: 'lidar' })
  | (BaseFormField<undefined> & {
      type: 'content';
      image?: string;
      size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
      color?: 'dimmed';
    })
  | (BaseFormField<string> & { type: 'clinician' })
  | (BaseFormField<string> & {
      type: 'select';
      options: FormFieldOption[];
      ui?: 'dropdown' | 'radio' | 'radio-col' | 'accordion' | 'segmented';
    })
  | (BaseFormField<string> & { type: 'select:gender' })
  | (BaseFormField<string> & { type: 'select:height' })
  | (BaseFormField<string> & { type: 'select:weight' })
  | (BaseFormField<string> & { type: 'select:device-type' })
  | (BaseFormField<string> & { type: 'select:device-type-side' })
  | (BaseFormField<string> & { type: 'select:device-type-position' })
  | (BaseFormField<string> & { type: 'select:physician' })
  | (BaseFormField<string> & { type: 'select:diagnosis' })
  | (BaseFormField<string> & { type: 'select:facility' })
  | (BaseFormField<string> & { type: 'select:patient' })
  | (BaseFormField<string> & { type: 'multiselect:billingCodes' })
  | (BaseFormField<string> & { type: 'custom:orthofeet' })
  | (BaseFormField<string[]> & { type: 'array' })
  | (BaseFormField<string[]> & {
      type: 'multiselect';
      options: FormFieldOption[];
      title?: string;
      ui?: 'accordion';
    });

import { FormSubmission, FormTemplate } from '../../prisma';

export interface FormSchema {
  sections: FormSection[];
}

export interface FormRule {
  effect: 'show' | 'hide' | 'enable' | 'disable';
  condition: { name: string; value: FormFieldValue };
}

export interface FormSection {
  title: string;
  description?: string;
  badge?: string;
  fields: FormField[];
  meta?: Record<string, string>;
  rule?: FormRule;
}

export type FormFieldValue = string | string[] | number | number[] | boolean | null | undefined;
export type FormTemplateExtended = FormTemplate & { schema: FormSchema };
export type FormSubmissionExtended = FormSubmission & { data: Record<string, FormFieldValue> };

interface BaseFormField<T extends FormFieldValue> {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  print?: boolean | { label: string };
  default?: T;
  dbField?: { table: string; column: string; unique?: string };
  rule?: FormRule;
}

export type FormField =
  | (BaseFormField<string> & { type: 'text'; suffix?: string; keyboard?: 'email' | 'url' | 'phone' })
  | (BaseFormField<number> & { type: 'number'; suffix?: string; keyboard?: 'numeric' | 'decimal' })
  | (BaseFormField<boolean> & { type: 'boolean'; ui?: 'toggle' | 'radio' })
  | (BaseFormField<string> & { type: 'date'; mode?: 'date' | 'datetime' | 'time'; min?: string; max?: string })
  | (BaseFormField<string> & { type: 'address' })
  | (BaseFormField<string[]> & { type: 'image'; multiple?: boolean })
  | (BaseFormField<string> & {
      type: 'select';
      options: { label: string; value: string }[];
      ui?: 'dropdown' | 'radio' | 'segmented';
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
  | (BaseFormField<string[]> & { type: 'array' })
  | (BaseFormField<string[]> & {
      type: 'multiselect';
      options: { label: string; value: string }[];
      title?: string;
      accordion?: boolean;
    });

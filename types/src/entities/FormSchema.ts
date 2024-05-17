import { FormSubmission, FormTemplate } from '../../prisma';

export interface FormSchema {
  sections: FormSection[];
}

export interface FormSection {
  title: string;
  description?: string;
  badge?: string;
  fields: FormField[];
}

export type FormFieldValue = string | string[] | number | number[] | boolean | null | undefined;
export type FormTemplateExtended = FormTemplate & { schema: FormSchema };
export type FormSubmissionExtended = FormSubmission & { data: Record<string, FormFieldValue> };

interface BaseFormField<T extends FormFieldValue> {
  name: string;
  label: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  print?: boolean | { label: string };
  default?: T;
  rule?: {
    effect: 'show' | 'hide' | 'enable' | 'disable';
    condition: { name: string; value: FormFieldValue };
  };
}

export type FormField =
  | (BaseFormField<string> & { type: 'text' })
  | (BaseFormField<number> & { type: 'number' })
  | (BaseFormField<boolean> & { type: 'boolean' })
  | (BaseFormField<string> & { type: 'date'; mode?: 'date' | 'datetime' | 'time'; min?: string; max?: string })
  | (BaseFormField<string> & { type: 'address' })
  | (BaseFormField<string> & { type: 'image' })
  | (BaseFormField<string> & { type: 'select'; options: { label: string; value: string }[] })
  | (BaseFormField<string> & { type: 'select:gender' })
  | (BaseFormField<string> & { type: 'select:height' })
  | (BaseFormField<string> & { type: 'select:weight' })
  | (BaseFormField<string> & { type: 'select:device-type' })
  | (BaseFormField<string> & { type: 'select:physician' })
  | (BaseFormField<string> & { type: 'select:diagnosis' })
  | (BaseFormField<string> & { type: 'select:facility' })
  | (BaseFormField<string> & { type: 'select:patient' })
  | (BaseFormField<string[]> & { type: 'multiselect'; options: { label: string; value: string }[]; title?: string });

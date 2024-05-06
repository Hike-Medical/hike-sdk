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
  value?: T;
  default?: T;
  rule?: {
    effect: 'SHOW' | 'HIDE' | 'ENABLE' | 'DISABLE';
    condition: { name: string; value: FormFieldValue | FormFieldValue[] };
  };
}

export type FormField =
  | (BaseFormField<string> & { type: 'text'; multi?: boolean })
  | (BaseFormField<string> & { type: 'number' })
  | (BaseFormField<boolean> & { type: 'boolean' })
  | (BaseFormField<string> & { type: 'date'; display?: string })
  | (BaseFormField<string> & { type: 'address' })
  | (BaseFormField<string> & { type: 'image' })
  | (BaseFormField<string> & { type: 'select'; options: { label: string; value: string }[] })
  | (BaseFormField<string[]> & { type: 'multiselect'; options: { label: string; value: string }[] });

import { FormTemplate } from '@prisma/client';
import { FormSubmissionTyped } from 'forms/FormSubmissionTyped';

export interface FormTemplateResponse extends Omit<FormTemplate, 'data'> {
  data: {
    name: string;
    schemaId: string;
    data: FormSubmissionTyped['data'];
  }[];
}

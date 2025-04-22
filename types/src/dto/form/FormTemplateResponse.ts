import { FormSubmissionTyped } from 'forms/FormSubmissionTyped';
import { FormTemplate } from '../../../prisma/index';

export interface FormTemplateResponse extends Omit<FormTemplate, 'data'> {
  data: {
    name: string;
    schemaId: string;
    data: FormSubmissionTyped['data'];
  }[];
}

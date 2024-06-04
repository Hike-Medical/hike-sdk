import { FormSubmissionTyped } from 'forms/FormSubmissionTyped';
import { UserTemplate } from '../../../prisma';

export interface FormTemplateResponse extends Omit<UserTemplate, 'data'> {
  data: {
    name: string;
    formSchemaId: string;
    data: FormSubmissionTyped['data'];
  }[];
}

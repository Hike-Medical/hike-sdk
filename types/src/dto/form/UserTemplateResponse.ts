import { FormSubmissionTyped } from 'entities/FormSchema';
import { UserTemplate } from '../../../prisma';

interface Data {
  name: string;
  formTemplateId: string;
  data: FormSubmissionTyped['data'];
}

export interface UserTemplateResponse extends Omit<UserTemplate, 'data'> {
  data: Data[];
}

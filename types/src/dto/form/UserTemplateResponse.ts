import { FormSubmissionExtended } from 'entities/FormSchema';
import { UserTemplate } from '../../../prisma';

interface Data {
  name: string;
  formTemplateId: string;
  data: FormSubmissionExtended['data'];
}

export interface UserTemplateResponse extends Omit<UserTemplate, 'data'> {
  data: Data[];
}

import { FormSubmission } from '../../prisma/index';
import { FormFieldValue } from './FormField';

export type FormSubmissionTyped = FormSubmission & {
  data: Record<string, FormFieldValue>;
};

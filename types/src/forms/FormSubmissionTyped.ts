import { FormSubmission } from '../../prisma';
import { FormFieldValue } from './FormField';

export type FormSubmissionTyped = FormSubmission & {
  data: Record<string, FormFieldValue>;
};

import { FormSubmission } from '@prisma/client';
import { FormFieldValue } from './FormField';

export type FormSubmissionTyped = FormSubmission & {
  data: Record<string, FormFieldValue>;
};

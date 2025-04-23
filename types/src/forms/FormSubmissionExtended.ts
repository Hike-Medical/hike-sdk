import { FormSchema, FormSubmission } from '../../prisma';

export type FormSubmissionExtended = FormSubmission & {
  schema: FormSchema;
};

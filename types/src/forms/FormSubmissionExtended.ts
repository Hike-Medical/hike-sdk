import { FormSchema, FormSubmission } from '@prisma/client';

export type FormSubmissionExtended = FormSubmission & {
  schema: FormSchema;
};

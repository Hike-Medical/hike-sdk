import { FormSchema, FormSubmission } from '../../prisma/index';

export type FormSubmissionExtended = FormSubmission & {
  schema: FormSchema;
};

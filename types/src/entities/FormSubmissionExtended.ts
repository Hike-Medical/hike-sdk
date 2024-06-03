import { FormSubmission, FormTemplate } from '../../prisma';

export type FormSubmissionExtended = FormSubmission & {
  template: FormTemplate;
};

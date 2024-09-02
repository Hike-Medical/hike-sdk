import { FormSchema, FormSubmission, ViewFlattenedWorkbench } from '../../../prisma';

export type FlattenedWorkbench = ViewFlattenedWorkbench & {
  formSubmissions?: (FormSubmission & { schema?: FormSchema })[];
};

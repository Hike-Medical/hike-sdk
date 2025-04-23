import { FormSchemaTyped } from 'forms/FormSchemaTyped';
import { FormSubmissionTyped } from 'forms/FormSubmissionTyped';
import { ViewFlattenedWorkbench } from '../../../prisma';

export type FlattenedWorkbench = ViewFlattenedWorkbench & {
  formSubmissions?: (FormSubmissionTyped & { schema?: FormSchemaTyped })[];
};

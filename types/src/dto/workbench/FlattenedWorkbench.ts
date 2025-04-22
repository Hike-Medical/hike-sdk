import { ViewFlattenedWorkbench } from '@prisma/client';
import { FormSchemaTyped } from 'forms/FormSchemaTyped';
import { FormSubmissionTyped } from 'forms/FormSubmissionTyped';

export type FlattenedWorkbench = ViewFlattenedWorkbench & {
  formSubmissions?: (FormSubmissionTyped & { schema?: FormSchemaTyped })[];
};

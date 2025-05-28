import { FormSchemaType } from '../../../prisma';

export interface GetFormSchemasParams {
  types: FormSchemaType[];
  excludeDefaults?: boolean;
}

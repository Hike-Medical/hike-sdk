import { FormSchemaType } from '../../../prisma';

export interface GetFormSchemasParams {
  ids?: string[];
  types?: FormSchemaType[];
  excludeDefaults?: boolean;
}

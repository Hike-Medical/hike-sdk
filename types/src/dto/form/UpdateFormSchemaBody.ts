import { FormSchemaTyped } from '../../forms/FormSchemaTyped';

export interface UpdateFormSchemaBody {
  title?: string;
  data: FormSchemaTyped['data'];
  expectedUpdatedAt: string;
}

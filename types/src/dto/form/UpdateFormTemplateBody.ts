import { FormTemplateResponse } from './FormTemplateResponse';

export interface UpdateFormTemplateBody {
  title: string;
  description?: string;
  data: FormTemplateResponse['data'];
}

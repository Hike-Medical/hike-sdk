import { FormSchema } from '../../prisma/index';
import { FormSection } from './FormSection';

export type FormSchemaTyped = FormSchema & {
  data: {
    sections: FormSection[];
  };
};

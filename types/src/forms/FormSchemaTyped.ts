import { FormSchema } from '../../prisma';
import { FormSection } from './FormSection';

export type FormSchemaTyped = FormSchema & {
  data: {
    sections: FormSection[];
  };
};

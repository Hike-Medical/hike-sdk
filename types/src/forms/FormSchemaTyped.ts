import { FormSchema } from '@prisma/client';
import { FormSection } from './FormSection';

export type FormSchemaTyped = FormSchema & {
  data: {
    sections: FormSection[];
  };
};

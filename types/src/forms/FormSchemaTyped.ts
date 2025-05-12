import { FormSchema } from '../../prisma';
import { FormRule } from './FormRule';
import { FormSection } from './FormSection';

export type FormSchemaTyped = FormSchema & {
  data: {
    sections: FormSection[];
    description?: string;
    rule?: FormRule;
  };
};

import { InvalidFormField } from './InvalidFormField';

export interface InvalidFormSection {
  index: number;
  title: string;
  fields: InvalidFormField[];
}

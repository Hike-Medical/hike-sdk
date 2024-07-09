import type { FieldPrint, FormField } from '@hike/types';
import { isFieldPrint } from './isFieldPrint';

export const isPrintableField = (value: unknown): value is FormField & { print: Record<string, FieldPrint> } =>
  value != null &&
  typeof value === 'object' &&
  'print' in value &&
  value.print != null &&
  typeof value.print === 'object' &&
  Object.values(value.print).every(isFieldPrint);

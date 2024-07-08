import type { FieldPrint } from '@hike/types';

export const isFieldPrint = (value: unknown): value is FieldPrint =>
  value != null && typeof value === 'object' && 'position' in value && typeof value.position === 'number';

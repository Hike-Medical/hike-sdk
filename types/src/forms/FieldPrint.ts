export interface FieldPrint {
  position: number;
  label?: string;
  colspan?: number;
  rowspan?: number;
  format?: string;
  style?: 'bold' | 'italic' | 'underline' | 'strikethrough';
  color?: string;
}

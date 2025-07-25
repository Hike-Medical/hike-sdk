export interface PdfContent {
  label: string;
  value: string | Buffer | (string | Buffer | null)[] | null;
  type?: string;
  colspan?: number;
  rowspan?: number;
  position?: number;
  width?: number;
  height?: number;
  border?: boolean;
  pageBreak?: boolean;
  style?: 'bold' | 'italic' | 'underline' | 'strikethrough';
  color?: string;
}

export interface PdfContent {
  label: string;
  value: string | Buffer | null;
  type?: string;
  colspan?: number;
  rowspan?: number;
  position?: number;
  width?: number;
  height?: number;
  border?: boolean;
  pageBreak?: boolean;
}

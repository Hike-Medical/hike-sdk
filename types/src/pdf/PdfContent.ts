export interface PdfContent {
  label: string;
  value: string | Buffer | null;
  colspan?: number;
  rowspan?: number;
}

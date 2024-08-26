import { PdfContent } from './PdfContent';

export interface PdfDoc {
  title: string;
  filePath: string;
  header?: string[];
  content: PdfContent[];
  footer?: string[];
  spacing?: {
    row?: number;
  };
}

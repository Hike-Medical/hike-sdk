export interface ImportPrimaryPhysiciansResponse {
  parsed: number;
  skipped: number;
  processed: number;
  physiciansCreated: string[];
  processingErrors: string[];
  parsingErrors: string[];
}

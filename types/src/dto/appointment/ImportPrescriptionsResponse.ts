export interface ImportPrescriptionsResponse {
  parsed: number;
  skipped: number;
  processed: number;
  physiciansCreated: string[];
  processingErrors: string[];
  parsingErrors: string[];
}

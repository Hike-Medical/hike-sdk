export interface ImportEvaluationsResponse {
  parsed: number;
  skipped: number;
  evaluationsProcessed: number;
  newEvaluations: string[];
  newPatients: string[];
  diabeticIds: string[];
  processingErrors: string[];
  parsingErrors: string[];
}

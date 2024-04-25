export interface EvaluationsUploadResult {
  parsed: number;
  skipped: number;
  patientsProcessed: number;
  patientDuplicates: number;
  evaluationsProcessed: number;
  processingErrors: string[];
}

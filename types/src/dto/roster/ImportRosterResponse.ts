export interface ImportRosterResponse {
  parsed: number;
  skipped: number;
  parsingErrors: string[];
  patientsProcessed: number;
  patientDuplicates: string[];
  patientErrors: string[];
}

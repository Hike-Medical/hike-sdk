export interface ImportRosterResponse {
  parsed: number;
  skipped: number;
  parsingErrors: string[];
  patientsUpdated: number;
  patientsAdded: string[];
  patientDuplicates: string[];
  patientErrors: string[];
}

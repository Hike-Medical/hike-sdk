import { RoasterPatientCsvRecord } from './RoasterPatientCsvRecord';

export interface ParseRosterColumnsResponse {
  columns: string[];
  suggested: Partial<Record<keyof RoasterPatientCsvRecord, string>>;
}

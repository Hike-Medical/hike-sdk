import { RoasterPatientCsvRecord } from './RoasterPatientCsvRecord';

export interface ImportRosterParams {
  fileKey: string;
  columnMapping: Partial<Record<keyof RoasterPatientCsvRecord, string>>;
  tag?: string;
  onlyTagCreated?: boolean;
}

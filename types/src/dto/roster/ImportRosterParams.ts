import { RoasterPatientCsvRecord } from './RoasterPatientCsvRecord';

export interface ImportRosterParams {
  fileKey: string;
  bucketName?: string;
  columnMapping: Partial<Record<keyof RoasterPatientCsvRecord, string>>;
  dateFormat?: string;
  tag?: string;
  onlyTagCreated?: boolean;
}

import { AppointmentCsvRecord } from './AppointmentCsvRecord';

export interface ImportAppointmentsParams {
  fileKey: string;
  bucketName?: string;
  columnMapping: Partial<Record<keyof AppointmentCsvRecord, string>>;
  timeZone?: string;
  dateFormat?: string;
}
